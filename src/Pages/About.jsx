import "./About.css";
import aboutImg from "../assets/about.jpg";
import aboutImgUp from "../assets/about-up.jpg";
import { useEffect, useState } from "react";
import api from "../api/axios";

function About() {
  const [count, setCount] = useState({
    years: 0,
    students: 0,
    faculty: 0,
    placement: 0,
  });

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  // FETCH CMS CONTENT
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get("/api/pages/about");
        setPage(res.data);
      } catch {
        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  // STATS ANIMATION
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => ({
        years: prev.years < 15 ? prev.years + 1 : 15,
        students: prev.students < 5000 ? prev.students + 50 : 5000,
        faculty: prev.faculty < 200 ? prev.faculty + 5 : 200,
        placement: prev.placement < 95 ? prev.placement + 1 : 95,
      }));
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const content = page?.content || {};

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <>
      {/* HERO */}
      <section className="about-hero">
        <img src={aboutImgUp} alt="About" />
        <div className="about-overlay">
          <h1>{page?.title || "About Meraki College"}</h1>
          <p>
            {content.heroSubtitle ||
              "Empowering Education for a Better Tomorrow"}
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="about-story">
        <div className="story-text">
          <h2>Our Story</h2>

          <p>
            {content.story1 ||
              "Meraki College of Innovation was founded with a bold vision — to redefine higher education by blending academic excellence, industry relevance, and innovation-driven learning."}
          </p>

          <p>
            {content.story2 ||
              "What began as a small academic initiative has grown into a vibrant institution dedicated to nurturing future-ready professionals. From its inception, Meraki College believed that education must evolve with the world it serves."}
          </p>

          <p>
            {content.story3 ||
              "Over the years, the college has built a strong academic foundation supported by experienced faculty, modern infrastructure, and a student-centric approach. Our programs bridge the gap between theory and real-world application."}
          </p>

          <p>
            {content.story4 ||
              "Beyond academics, Meraki College emphasizes holistic development — fostering leadership, innovation, ethics, and social responsibility to shape confident global citizens."}
          </p>
        </div>

        <div className="story-img">
          <img src={aboutImg} alt="Campus" />
        </div>
      </section>

      {/* LEADERSHIP & VALUES */}
      <section className="about-values">
        <h2>Leadership & Core Values</h2>
        <p className="about-sub">
          Driven by purpose, guided by innovation, and committed to excellence.
        </p>

        <div className="values-grid">
          <div className="value-card">🎯 Academic Excellence</div>
          <div className="value-card">🤝 Integrity & Ethics</div>
          <div className="value-card">🚀 Innovation Mindset</div>
          <div className="value-card">🌍 Global Perspective</div>
          <div className="value-card">💡 Student-First Culture</div>
          <div className="value-card">🏆 Outcome-Driven Education</div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="about-mission">
        <div className="mission-box">
          <h3>Our Mission</h3>
          <ul>
            {(content.mission || [
              "Deliver quality education with practical exposure",
              "Foster research and innovation",
              "Build industry-ready professionals",
              "Promote ethical values and social responsibility",
            ]).map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>

        <div className="vision-box">
          <h3>Our Vision</h3>
          <ul>
            {(content.vision || [
              "Global recognition for excellence",
              "Innovation & entrepreneurship hub",
              "Strong industry partnerships",
              "Inclusive and sustainable growth",
            ]).map((v, i) => (
              <li key={i}>{v}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* STATS */}
      <section className="about-stats">
        <div>
          <h2>{count.years}+</h2>
          <p>Years of Excellence</p>
        </div>
        <div>
          <h2>{count.students}+</h2>
          <p>Students Enrolled</p>
        </div>
        <div>
          <h2>{count.faculty}+</h2>
          <p>Expert Faculty</p>
        </div>
        <div>
          <h2>{count.placement}%</h2>
          <p>Placement Rate</p>
        </div>
      </section>
    </>
  );
}

export default About;
