import { useEffect, useState } from "react";
import api from "../api/axios";
import "./PublicPages.css";

export default function PublicDepartments() {
    const [depts, setDepts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/api/departments/public")
            .then((res) => setDepts(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="public-page">
            <div className="page-header">
                <h1>Departments</h1>
                <p>Centers of Excellence and Innovation.</p>
            </div>

            <div className="container">
                {loading ? <p>Loading departments...</p> : (
                    <div className="grid-container">
                        {depts.map((d) => (
                            <div key={d._id} className="info-card dept-card">
                                <h2>{d.name}</h2>
                                <p>code: {d.code}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
