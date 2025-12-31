/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const AntigravityInner = ({
    count = 300,
    magnetRadius = 30, /* ✅ Increased: Pull particles from further away */
    ringRadius = 15,   /* ✅ Increased: Larger ring around mouse */
    waveSpeed = 0.4,
    waveAmplitude = 1,
    particleSize = 2,
    lerpSpeed = 0.2,   /* ✅ Faster: Particles follow mouse quickly */
    color = '#FF9FFC',
    autoAnimate = false, /* Mouse control only */
    particleVariance = 1,
    rotationSpeed = 0,   /* No rotation */
    depthFactor = 1,
    pulseSpeed = 3,
    particleShape = 'capsule',
    fieldStrength = 25 /* ✅ Strong Pull */
}) => {
    const meshRef = useRef(null);
    const { viewport } = useThree();
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const lastMousePos = useRef({ x: 0, y: 0 });
    const lastMouseMoveTime = useRef(0);
    const virtualMouse = useRef({ x: 0, y: 0 });

    const particles = useMemo(() => {
        const temp = [];
        const width = viewport.width || 100;
        const height = viewport.height || 100;

        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const mx = (Math.random() - 0.5) * width;
            const my = (Math.random() - 0.5) * height;
            const mz = (Math.random() - 0.5) * 20;

            temp.push({
                t,
                factor,
                speed,
                mx, my, mz, // Original positions
                cx: mx, cy: my, cz: mz, // Current positions
                randomRadiusOffset: (Math.random() - 0.5) * 2
            });
        }
        return temp;
    }, [count, viewport.width, viewport.height]);

    useFrame(state => {
        const mesh = meshRef.current;
        if (!mesh) return;

        const { viewport: v, pointer: m } = state;

        // Update mouse timestamp
        if (Math.abs(m.x - lastMousePos.current.x) > 0.001 || Math.abs(m.y - lastMousePos.current.y) > 0.001) {
            lastMouseMoveTime.current = Date.now();
            lastMousePos.current = { x: m.x, y: m.y };
        }

        // Determine target position for "virtual mouse"
        let destX = (m.x * v.width) / 2;
        let destY = (m.y * v.height) / 2;

        if (autoAnimate && Date.now() - lastMouseMoveTime.current > 2000) {
            const time = state.clock.getElapsedTime();
            destX = Math.sin(time * 0.5) * (v.width / 4);
            destY = Math.cos(time * 0.5 * 2) * (v.height / 4);
        }

        // Smooth mouse movement
        virtualMouse.current.x += (destX - virtualMouse.current.x) * 0.1;
        virtualMouse.current.y += (destY - virtualMouse.current.y) * 0.1;

        const targetX = virtualMouse.current.x;
        const targetY = virtualMouse.current.y;
        const globalRotation = state.clock.getElapsedTime() * rotationSpeed;

        // Update Particles
        particles.forEach((particle, i) => {
            let { t, speed, mx, my, mz, cz, randomRadiusOffset } = particle;
            t = particle.t += speed / 2;

            // Current particle origin (projected)
            // We base the attraction on the original position relative to the mouse

            const dx = mx - targetX;
            const dy = my - targetY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            let targetPos = { x: mx, y: my, z: mz * depthFactor };

            // Interaction Logic
            if (dist < magnetRadius) {
                const angle = Math.atan2(dy, dx) + globalRotation;
                const wave = Math.sin(t * waveSpeed + angle) * (0.5 * waveAmplitude);
                const deviation = randomRadiusOffset * (5 / (fieldStrength + 0.1));
                const currentRingRadius = ringRadius + wave + deviation;

                // Move towards ring
                targetPos.x = targetX + currentRingRadius * Math.cos(angle);
                targetPos.y = targetY + currentRingRadius * Math.sin(angle);
                // Add some Z movement
                targetPos.z = mz * depthFactor + Math.sin(t) * (2 * waveAmplitude);
            }
            // Return to original position if not affected logic could go here, 
            // but current logic just keeps them at 'mx, my' if outside radius

            // Lerp to target
            particle.cx += (targetPos.x - particle.cx) * lerpSpeed;
            particle.cy += (targetPos.y - particle.cy) * lerpSpeed;
            particle.cz += (targetPos.z - particle.cz) * lerpSpeed;

            dummy.position.set(particle.cx, particle.cy, particle.cz);
            dummy.lookAt(targetX, targetY, particle.cz); // Look at mouse
            dummy.rotateX(Math.PI / 2);

            // Scale Logic (Zoom effect user noticed)
            const currentDistToMouse = Math.sqrt(
                Math.pow(particle.cx - targetX, 2) + Math.pow(particle.cy - targetY, 2)
            );

            let scaleFactor = 0;
            if (dist < magnetRadius) {
                const distFromRing = Math.abs(currentDistToMouse - ringRadius);
                scaleFactor = 1 - distFromRing / (magnetRadius * 0.5);
                scaleFactor = Math.max(0, Math.min(1, scaleFactor));
            }

            const finalScale = scaleFactor * (0.8 + Math.sin(t * pulseSpeed) * 0.2 * particleVariance) * particleSize;
            dummy.scale.set(finalScale, finalScale, finalScale);
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        });

        mesh.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            {particleShape === 'capsule' && <capsuleGeometry args={[0.1, 0.4, 4, 8]} />}
            {particleShape === 'sphere' && <sphereGeometry args={[0.2, 16, 16]} />}
            {particleShape === 'box' && <boxGeometry args={[0.3, 0.3, 0.3]} />}
            {particleShape === 'tetrahedron' && <tetrahedronGeometry args={[0.3]} />}
            <meshBasicMaterial color={color} />
        </instancedMesh>
    );
};

const Antigravity = props => {
    return (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1, background: "black" }}>
            <Canvas camera={{ position: [0, 0, 50], fov: 35 }}>
                <AntigravityInner {...props} />
            </Canvas>
        </div>
    );
};

export default Antigravity;
