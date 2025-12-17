import { useEffect, useState } from "react";
import "./Faq.css";
import { Link } from "react-router-dom";
import api from "../api/axios";

// FALLBACK FAQ (used only if DB is empty)
const fallbackFaq = [
  {
    category: "General",
    items: [
      {
        q: "What are the admission requirements?",
        a: "You must complete 10+2 with minimum 60%."
      }
    ]
  }
];

function Faq() {
  const [active, setActive] = useState(null);
  const [search, setSearch] = useState("");
  const [faqData, setFaqData] = useState(fallbackFaq);
  const [title, setTitle] = useState("Frequently Asked Questions");

  const toggleFaq = (id) => {
    setActive(active === id ? null : id);
  };

  // FETCH FAQ FROM CMS
  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const res = await api.get("/api/pages/faq");
        const data = res.data;

        setTitle(data.title || "Frequently Asked Questions");

        if (data?.content?.questions?.length > 0) {
          setFaqData([
            {
              category: "FAQs",
              items: data.content.questions,
            },
          ]);
        }
      } catch {
        // fallback already set
      }
    };

    fetchFaq();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="faq-hero">
        <div className="faq-overlay">
          <h1>{title}</h1>
          <p>Everything you need to know about Meraki College</p>
        </div>
      </section>

      {/* SEARCH */}
      <section className="faq-search">
        <input
          type="text"
          placeholder="Search your question..."
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </section>

      {/* FAQ SECTION */}
      <section className="faq-section">
        {faqData.map((block, blockIndex) => (
          <div className="faq-category" key={blockIndex}>
            <h2>{block.category}</h2>

            {block.items
              .filter((item) =>
                item.q.toLowerCase().includes(search)
              )
              .map((item, index) => {
                const id = `${blockIndex}-${index}`;
                return (
                  <div
                    className={`faq-item ${active === id ? "open" : ""}`}
                    key={id}
                    onClick={() => toggleFaq(id)}
                  >
                    <div className="faq-question">
                      <h4>{item.q}</h4>
                      <span>{active === id ? "-" : "+"}</span>
                    </div>
                    <div className="faq-answer">
                      <p>{item.a}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="faq-cta">
        <h2>Still Have Questions?</h2>
        <p>Our team is ready to help you anytime.</p>
        <Link to="/contact">
          <button>Contact Now</button>
        </Link>
      </section>
    </>
  );
}

export default Faq;
