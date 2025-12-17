import "./Service.css";
import heroImg from "../assets/hero-service.webp";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

const fallbackServices = [
  { icon: "🎓", title: "Academic Programs", desc: "B.Tech, MBA, AI & more." },
  { icon: "💼", title: "Career Guidance", desc: "Resume training & interviews." },
  { icon: "🧪", title: "Research Facilities", desc: "Advanced labs & grants." },
];

function Services() {
  const navigate = useNavigate();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/api/pages/services");
        setPage(res.data);
      } catch {
        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const content = page?.content || {};
  const services = content.services || fallbackServices;
  const why = content.why || [
    "Industry-linked learning",
    "Global certifications",
    "Internship & placement guarantee",
    "Innovation-focused education",
    "360° student development",
  ];

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="services-page">
      {/* HERO */}
      <section className="services-hero">
        <img src={heroImg} alt="Our Services" />
        <div className="services-overlay">
          <h1>{page?.title || "Our Services"}</h1>
          <p>{content.heroSubtitle || "Powering Your Education With Excellence"}</p>
        </div>
      </section>

      {/* INTRO */}
      <section className="services-intro">
        <h2>What We Offer</h2>
        <p>
          At Meraki College of Innovation, we provide a complete ecosystem of
          academic excellence, professional growth, innovation, and student wellbeing.
        </p>
      </section>

      {/* SERVICES GRID */}
      <section className="services-grid-section">
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card" key={i}>
              {s.icon} <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EXTRA VALUE */}
      <section className="services-extra">
        <h2>Why Students Choose Our Services</h2>
        <p>
          {why.map((w, i) => (
            <span key={i}>✔ {w} &nbsp;</span>
          ))}
        </p>
      </section>

      {/* CTA */}
      <section className="services-cta">
        <h2>Build Your Future With Us</h2>
        <p>{content.ctaText || "Admissions Open for 2025 — Apply Today"}</p>
        <button onClick={() => navigate("/login")}>Apply Now</button>
      </section>
    </div>
  );
}

export default Services;
