import { useState } from "react";
import "./Contact.css";
import { Link } from "react-router-dom";


import api from "../api/axios";

function Contact() {
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const regex = {
    fname: /^[A-Za-z ]{3,}$/,
    lname: /^[A-Za-z ]{1,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[6-9][0-9]{9}$/,
    subject: /^.{3,}$/,
    message: /^.{10,}$/,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (!regex[name].test(value)) {
      setErrors({ ...errors, [name]: "Invalid input" });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).some((err) => err !== "")) {
      alert("Fix all errors before submitting!");
      return;
    }

    if (Object.values(form).some((val) => val === "")) {
      alert("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      await api.post("/api/contact", form);
      alert("✅ Message Sent Successfully!");
      setForm({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      alert("Failed to send message: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="contact-hero">
        <div className="contact-overlay">
          <h1>Contact Us</h1>
          <p>We’d Love to Hear From You</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-container">

          {/* FORM */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send Us a Message</h2>

            <div className="input-row">
              <div>
                <input
                  type="text"
                  name="fname"
                  placeholder="First Name"
                  value={form.fname}
                  onChange={handleChange}
                />
                <small>{errors.fname}</small>
              </div>

              <div>
                <input
                  type="text"
                  name="lname"
                  placeholder="Last Name"
                  value={form.lname}
                  onChange={handleChange}
                />
                <small>{errors.lname}</small>
              </div>
            </div>

            <div className="input-row">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                />
                <small>{errors.email}</small>
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                />
                <small>{errors.phone}</small>
              </div>
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
            />
            <small>{errors.subject}</small>

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
            ></textarea>
            <small>{errors.message}</small>

            <button type="submit">Send Message</button>
          </form>

          {/* INFO */}
          <div className="contact-info">
            <h2>Get in Touch</h2>

            <div className="info-box">
              <h4>📍 Address</h4>
              <p>Meraki College of Innovation</p>
              <p>Vellore, Tamil Nadu</p>
            </div>

            <div className="info-box">
              <h4>📧 Email</h4>
              <p>info@merakicollege.com</p>
              <p>admissions@merakicollege.com</p>
            </div>

            <div className="info-box">
              <h4>📞 Phone</h4>
              <p>+91 98765 43210</p>
            </div>

            <div className="info-box">
              <h4>🕒 Office Hours</h4>
              <p>Mon–Fri: 9AM – 5PM</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-map">
        <iframe
          src="https://www.google.com/maps?q=Vellore&output=embed"
          loading="lazy"
        ></iframe>
      </section>
    </>
  );
}

export default Contact;
