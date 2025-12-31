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
Welcome to Meraki College of Innovation. By accessing and using this website, you agree to comply with the following terms and conditions.

Use of Website:
• The website is intended for academic, informational, and administrative purposes only.
• Unauthorized use or misuse of the website is strictly prohibited.

Admissions:
• Admission is granted based on eligibility criteria, merit, and institutional policies.
• Submission of an application does not guarantee admission.

Fees & Payments:
• All fees must be paid within the specified timelines.
• Fees once paid are non-refundable except in special cases approved by the administration.

Student Responsibilities:
• Students must maintain academic integrity at all times.
• Discipline, respectful conduct, and adherence to college rules are mandatory.

Intellectual Property:
• All website content, logos, and materials are the property of Meraki College.
• Reproduction or redistribution without permission is prohibited.

Security & Misuse:
• Any attempt to hack, disrupt, or misuse the system will result in strict disciplinary and legal action.

Policy Updates:
• The institution reserves the right to update or modify these terms without prior notice.

By continuing to use this website, you acknowledge and accept these terms and conditions.
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
