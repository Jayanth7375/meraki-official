import { useEffect, useState } from "react";
import axios from "axios";

export default function FaqEditor() {
  const [title, setTitle] = useState("");
  const [faqs, setFaqs] = useState([{ q: "", a: "" }]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/pages/faq")
      .then(res => {
        setTitle(res.data.title);
        setFaqs(res.data.content.questions || []);
      })
      .catch(() => {});
  }, []);

  const save = async () => {
    await axios.post(
      "http://localhost:5000/api/pages",
      {
        slug: "faq",
        title,
        content: { questions: faqs }
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("FAQ saved");
  };

  return (
    <div className="admin-card">
      <h2>Edit FAQ</h2>

      <input className="admin-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Page Title" />

      {faqs.map((f, i) => (
        <div key={i}>
          <input className="admin-input" placeholder="Question" value={f.q}
            onChange={e => {
              const arr = [...faqs];
              arr[i].q = e.target.value;
              setFaqs(arr);
            }}
          />
          <textarea className="admin-textarea" placeholder="Answer" value={f.a}
            onChange={e => {
              const arr = [...faqs];
              arr[i].a = e.target.value;
              setFaqs(arr);
            }}
          />
        </div>
      ))}

      <button onClick={() => setFaqs([...faqs, { q: "", a: "" }])}>+ Add FAQ</button>
      <button className="admin-btn" onClick={save}>Save FAQ</button>
    </div>
  );
}
