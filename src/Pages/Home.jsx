import "./Home.css";
import heroImg from "../assets/campus.avif";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* HERO */}
      <section className="home-hero">
        <img src={heroImg} alt="Campus" className="hero-bg" />
        <div className="hero-overlay">
          <h1>Meraki College of Innovation</h1>
          <p>Empowering Education for a Better Tomorrow</p>

          <div className="hero-buttons">
            {/* ✅ APPLY NOW → LOGIN */}
            <button
              className="btn-primary"
              onClick={() => navigate("/login")}
            >
              Apply Now
            </button>

            {/* ✅ EXPLORE COURSES → REGISTER */}
            <button
              className="btn-secondary"
              onClick={() => navigate("/register")}
            >
              Explore Courses
            </button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-section">
        <h2>Why Choose Meraki?</h2>
        <p className="section-desc">
          We build future-ready professionals with world-class infrastructure,
          expert faculty, and industry-driven education.
        </p>

        <div className="why-grid">
          <div className="why-box">🎓 Experienced Faculty</div>
          <div className="why-box">💻 Smart Classrooms</div>
          <div className="why-box">🏆 95% Placements</div>
          <div className="why-box">🌎 Global Exposure</div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="programs-section">
        <h2>Our Popular Programs</h2>

        <div className="program-grid">
          <div className="program-card">Engineering & Technology</div>
          <div className="program-card">Computer Science</div>
          <div className="program-card">Business Administration</div>
          <div className="program-card">Arts & Sciences</div>
        </div>
      </section>

      {/* STATS */}
      <section className="home-stats">
        <div>
          <h2>15+</h2>
          <p>Years of Excellence</p>
        </div>
        <div>
          <h2>5000+</h2>
          <p>Students</p>
        </div>
        <div>
          <h2>200+</h2>
          <p>Faculty</p>
        </div>
        <div>
          <h2>95%</h2>
          <p>Placements</p>
        </div>
      </section>

      {/* CAMPUS LIFE */}
      <section className="campus-section">
        <h2>Campus Life</h2>
        <p>
          Our campus provides a vibrant and engaging environment with world-class
          sports, hostels, modern labs, and cultural activities.
        </p>

        <div className="campus-grid">
          <div className="campus-box">🏀 Sports & Gym</div>
          <div className="campus-box">🏠 Hostel Facilities</div>
          <div className="campus-box">📚 Digital Library</div>
          <div className="campus-box">🎭 Cultural Events</div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <h2>Ready to Start Your Journey?</h2>
        <p>Join thousands of students who chose Meraki College</p>

        {/* ✅ REGISTER NOW → REGISTER */}
        <button onClick={() => navigate("/register")}>
          Register Now
        </button>
      </section>
    </>
  );
}

export default Home;
