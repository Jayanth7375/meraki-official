import { useEffect, useState } from "react";
import AdminLayout from "../Components/AdminLayout";
import api from "../api/axios";
import "./Admin.css";

export default function ManagePages() {
  const [page, setPage] = useState("about");
  const [title, setTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [story1, setStory1] = useState("");
  const [story2, setStory2] = useState("");
  const [mission, setMission] = useState([""]);
  const [vision, setVision] = useState([""]);
  const [text, setText] = useState("");
  const [faqs, setFaqs] = useState([{ q: "", a: "" }]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // LOAD PAGE DATA
  useEffect(() => {
    const loadPage = async () => {
      try {
        setLoading(true);
        setMsg("");

        const res = await api.get(`/api/pages/${page}`);
        const data = res.data || {};

        setTitle(data.title || "");
        const c = data.content || {};

        if (page === "about") {
          setHeroSubtitle(c.heroSubtitle || "");
          setStory1(c.story1 || "");
          setStory2(c.story2 || "");
          setMission(c.mission || [""]);
          setVision(c.vision || [""]);
        }

        if (page === "faq") {
          setFaqs(c.questions || [{ q: "", a: "" }]);
        }

        if (page === "privacy" || page === "terms") {
          setText(c.text || "");
        }
      } catch {
        // RESET ON ERROR / EMPTY PAGE
        setTitle("");
        setHeroSubtitle("");
        setStory1("");
        setStory2("");
        setMission([""]);
        setVision([""]);
        setText("");
        setFaqs([{ q: "", a: "" }]);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [page]);

  // SAVE PAGE
  const savePage = async () => {
    let content = {};

    if (page === "about") {
      content = { heroSubtitle, story1, story2, mission, vision };
    }

    if (page === "faq") {
      content = { questions: faqs };
    }

    if (page === "privacy" || page === "terms") {
      content = { text };
    }

    try {
      setLoading(true);
      setMsg("");

      await api.post("/api/pages", {
        slug: page,
        title,
        content,
      });

      setMsg("✅ Page saved successfully");
    } catch {
      setMsg("❌ Save failed");
    } finally {
      setLoading(false);
    }
  };

  const updateList = (list, setList, index, value) => {
    const updated = [...list];
    updated[index] = value;
    setList(updated);
  };

  return (
    <AdminLayout>
      <h1 className="admin-title">CMS Page Editor</h1>

      {/* PAGE SELECTOR */}
      <div className="admin-card">
        <label>Select Page</label>
        <select
          className="admin-input"
          value={page}
          onChange={(e) => setPage(e.target.value)}
        >
          <option value="about">About</option>
          <option value="faq">FAQ</option>
          <option value="privacy">Privacy Policy</option>
          <option value="terms">Terms & Conditions</option>
        </select>
      </div>

      <div className="admin-card">
        <input
          className="admin-input"
          placeholder="Page Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* ABOUT PAGE */}
        {page === "about" && (
          <>
            <input
              className="admin-input"
              placeholder="Hero Subtitle"
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
            />

            <textarea
              className="admin-textarea"
              placeholder="Story Paragraph 1"
              value={story1}
              onChange={(e) => setStory1(e.target.value)}
            />

            <textarea
              className="admin-textarea"
              placeholder="Story Paragraph 2"
              value={story2}
              onChange={(e) => setStory2(e.target.value)}
            />

            <h3>Mission</h3>
            {mission.map((m, i) => (
              <input
                key={i}
                className="admin-input"
                value={m}
                onChange={(e) =>
                  updateList(mission, setMission, i, e.target.value)
                }
              />
            ))}
            <button onClick={() => setMission([...mission, ""])}>+ Add Mission</button>

            <h3>Vision</h3>
            {vision.map((v, i) => (
              <input
                key={i}
                className="admin-input"
                value={v}
                onChange={(e) =>
                  updateList(vision, setVision, i, e.target.value)
                }
              />
            ))}
            <button onClick={() => setVision([...vision, ""])}>+ Add Vision</button>
          </>
        )}

        {/* FAQ PAGE */}
        {page === "faq" &&
          faqs.map((f, i) => (
            <div key={i}>
              <input
                className="admin-input"
                placeholder="Question"
                value={f.q}
                onChange={(e) => {
                  const arr = [...faqs];
                  arr[i].q = e.target.value;
                  setFaqs(arr);
                }}
              />
              <textarea
                className="admin-textarea"
                placeholder="Answer"
                value={f.a}
                onChange={(e) => {
                  const arr = [...faqs];
                  arr[i].a = e.target.value;
                  setFaqs(arr);
                }}
              />
            </div>
          ))}

        {page === "faq" && (
          <button onClick={() => setFaqs([...faqs, { q: "", a: "" }])}>
            + Add FAQ
          </button>
        )}

        {/* PRIVACY & TERMS */}
        {(page === "privacy" || page === "terms") && (
          <textarea
            className="admin-textarea"
            rows="10"
            placeholder="Page Content"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        )}

        <button className="admin-btn" onClick={savePage} disabled={loading}>
          {loading ? "Saving..." : "Save Page"}
        </button>

        {msg && <p>{msg}</p>}
      </div>
    </AdminLayout>
  );
}
