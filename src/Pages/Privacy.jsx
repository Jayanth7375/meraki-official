import { useEffect, useState } from "react";
import "./Privacy.css";
import api from "../api/axios";

function Privacy() {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrivacy = async () => {
      try {
        const res = await api.get("/api/pages/privacy");
        setPage(res.data);
      } catch {
        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacy();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  const contentText =
  page?.content?.text ||
  `
At Meraki College of Innovation, your privacy is extremely important to us. This Privacy Policy outlines how we collect, use, and safeguard your information.

Information We Collect:
We may collect personal details such as your name, email address, phone number, academic details, and enquiry information when you submit forms on our website.

How We Use Your Information:
The information collected is used strictly for academic communication, admission processing, student support, and institutional updates.

Data Security:
We implement industry-standard security measures to protect your data from unauthorized access, misuse, or disclosure.

Cookies & Tracking:
Our website may use cookies to improve user experience, analyze website traffic, and personalize content. You can disable cookies in your browser settings.

Third-Party Services:
We do not sell or share your personal data with third parties except where required by law or for essential academic operations.

Your Rights:
You have the right to access, update, or request deletion of your personal data at any time by contacting the college administration.

Policy Updates:
This Privacy Policy may be updated periodically. Any changes will be reflected on this page.

By using our website, you agree to the terms outlined in this Privacy Policy.
`;


  return (
    <section className="legal-page">
      <div className="legal-hero">
        <h1>{page?.title || "Privacy Policy"}</h1>
        <p>Your Trust Matters To Us</p>
      </div>

      <div className="legal-container">
        {contentText
          .split("\n")
          .filter(Boolean)
          .map((para, i) => (
            <p key={i}>{para}</p>
          ))}
      </div>
    </section>
  );
}

export default Privacy;
