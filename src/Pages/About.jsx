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

  // STATS ANIMATION (UNCHANGED)
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

      {/* STORY */}
      <section className="about-story">
        <div className="story-text">
          <h2>Our Story</h2>
          <p>
            {content.story1 ||
              "Founded with a vision to revolutionize education, Meraki College of Innovation stands at the forefront of academic excellence."}
          </p>
          <p>
            {content.story2 ||
              "With world-class infrastructure, expert faculty, and a student-first approach, we transform classrooms into launchpads for success."}
          </p>
        </div>

        <div className="story-img">
          <img src={aboutImg} alt="Campus" />
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
