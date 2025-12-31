import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import "./PublicPages.css";

export default function PublicCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/api/courses/public")
            .then((res) => setCourses(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="public-page">
            <div className="page-header">
                <h1>Academic Courses</h1>
                <p>Explore our diverse range of subjects and specializations.</p>
            </div>

            <div className="container">
                {loading ? <p>Loading courses...</p> : (
                    <div className="grid-container">
                        {courses.map((c) => (
                            <div key={c._id} className="info-card">
                                <h3>{c.name}</h3>
                                <span className="badge">{c.department}</span>
                                <p>{c.description || "No description available."}</p>
                                <small>Credits: {c.credits || 4}</small>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
