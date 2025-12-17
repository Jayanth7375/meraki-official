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
We collect personal information such as name, email, and phone number when you submit forms.

Your data is used strictly for academic communication and admission processes.

We implement strict security measures to protect your personal information.

Our website may use cookies to enhance browsing experience.

You may request data deletion by contacting the administration.
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
