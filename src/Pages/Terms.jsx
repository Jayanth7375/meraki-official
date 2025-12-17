import { useEffect, useState } from "react";
import "./Terms.css";
import api from "../api/axios";

function Terms() {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await api.get("/api/pages/terms");
        setPage(res.data);
      } catch {
        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  const contentText =
    page?.content?.text ||
    `
By accessing Meraki College of Innovation, you agree to follow all terms, policies, and rules stated on this website.

Admission is based on merit and eligibility. Submission of application does not guarantee selection.

Fees once paid are non-refundable except in special conditions approved by the administration.

Students must maintain discipline, academic integrity, and respect all institutional guidelines.

Any misuse, hacking attempt, or illegal activity will result in legal action.

The institution reserves the right to modify these terms without prior notice.
`;

  return (
    <section className="legal-page">
      <div className="legal-hero">
        <h1>{page?.title || "Terms & Conditions"}</h1>
        <p>Last Updated: {new Date().getFullYear()}</p>
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

export default Terms;
