import { useEffect, useState } from "react";
import api from "../api/axios";
import "./PublicPages.css";

export default function PublicStaff() {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/api/staff/public")
            .then((res) => setStaff(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="public-page">
            <div className="page-header">
                <h1>Our Faculty</h1>
                <p>Meet the dedicated educators at Meraki College.</p>
            </div>

            <div className="container">
                {loading ? <p>Loading staff...</p> : (
                    <div className="grid-container">
                        {staff.map((s) => (
                            <div key={s._id} className="info-card staff-card">
                                <div className="avatar-placeholder">{s.name.charAt(0)}</div>
                                <h3>{s.name}</h3>
                                <p className="role">{s.title || "Faculty"} - {s.department}</p>
                                <p className="email">{s.email}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
