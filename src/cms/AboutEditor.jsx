import { useEffect, useState } from "react";
import axios from "axios";

export default function AboutEditor() {
  const [title, setTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [story1, setStory1] = useState("");
  const [story2, setStory2] = useState("");
  const [mission, setMission] = useState([""]);
  const [vision, setVision] = useState([""]);
  const [msg, setMsg] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/pages/about")
      .then((res) => {
        const c = res.data.content;
        setTitle(res.data.title);
        setHeroSubtitle(c.heroSubtitle || "");
        setStory1(c.story1 || "");
        setStory2(c.story2 || "");
        setMission(c.mission || [""]);
        setVision(c.vision || [""]);
      })
      .catch(() => {});
  }, []);

  const save = async () => {
    await axios.post(
      "http://localhost:5000/api/pages",
      {
        slug: "about",
        title,
        content: { heroSubtitle, story1, story2, mission, vision }
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setMsg("✅ About page updated");
  };

  const updateList = (list, setList, i, val) => {
    const arr = [...list];
    arr[i] = val;
    setList(arr);
  };

  return (
    <div className="admin-card">
      <h2>Edit About Page</h2>

      <input className="admin-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Page Title" />
      <input className="admin-input" value={heroSubtitle} onChange={e => setHeroSubtitle(e.target.value)} placeholder="Hero Subtitle" />

      <textarea className="admin-textarea" value={story1} onChange={e => setStory1(e.target.value)} placeholder="Story Paragraph 1" />
      <textarea className="admin-textarea" value={story2} onChange={e => setStory2(e.target.value)} placeholder="Story Paragraph 2" />

      <h3>Mission</h3>
      {mission.map((m, i) => (
        <input key={i} className="admin-input" value={m} onChange={e => updateList(mission, setMission, i, e.target.value)} />
      ))}
      <button onClick={() => setMission([...mission, ""])}>+ Add</button>

      <h3>Vision</h3>
      {vision.map((v, i) => (
        <input key={i} className="admin-input" value={v} onChange={e => updateList(vision, setVision, i, e.target.value)} />
      ))}
      <button onClick={() => setVision([...vision, ""])}>+ Add</button>

      <button className="admin-btn" onClick={save}>Save</button>
      {msg && <p>{msg}</p>}
    </div>
  );
}
