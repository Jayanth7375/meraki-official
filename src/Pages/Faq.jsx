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
        a: "Applicants must have completed 10+2 or equivalent with a minimum of 60% aggregate marks from a recognized board."
      },
      {
        q: "Is there an entrance exam for admission?",
        a: "Yes. Admissions are based on a combination of entrance test scores, academic performance, and personal interview."
      },
      {
        q: "Can students from other states apply?",
        a: "Yes. Meraki College welcomes students from all states and backgrounds across India."
      },
      {
        q: "Is lateral entry available?",
        a: "Yes. Lateral entry is available for eligible diploma holders as per university norms."
      },
      {
        q: "Does the college provide placement assistance?",
        a: "Yes. Our dedicated placement cell provides career guidance, training, and recruitment opportunities."
      },
      {
        q: "Which companies visit the campus for placements?",
        a: "Our recruiters include top companies from IT, core engineering, analytics, and startup ecosystems."
      },
      {
        q: "Are internships mandatory?",
        a: "Yes. Internships are an integral part of the curriculum to ensure real-world exposure."
      },
      {
        q: "What is the average placement package?",
        a: "Placement packages vary by program and performance, with competitive packages offered by leading companies."
      },
      {
        q: "Does the college provide hostel facilities?",
        a: "Yes. Separate, secure hostel facilities are available for boys and girls with modern amenities."
      },
      {
        q: "Is transportation provided?",
        a: "Yes. College buses operate on major routes covering nearby cities and towns."
      },
      {
        q: "What facilities are available on campus?",
        a: "Our campus includes smart classrooms, advanced labs, a digital library, sports facilities, and cafeterias."
      },
      {
        q: "Is the campus Wi-Fi enabled?",
        a: "Yes. High-speed Wi-Fi is available throughout the campus for academic use."
      },
      {
        q: "What is the fee structure?",
        a: "The fee structure varies by program and is communicated during the admission process."
      },
      {
        q: "Are scholarships available?",
        a: "Yes. Merit-based, need-based, and government scholarships are available for eligible students."
      },
      {
        q: "Can fees be paid in installments?",
        a: "Yes. Installment options are available as per college policy."
      },
      {
        q: "How can I contact the admissions office?",
        a: "You can contact us via the Contact page, email, or phone numbers listed on the website."
      },
      {
        q: "Where can I find academic calendars and notices?",
        a: "All important announcements, calendars, and notices are published on the official website."
      },
      {
        q: "Is Meraki College affiliated and approved?",
        a: "Yes. Meraki College is affiliated with the relevant university and approved by statutory authorities."
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
