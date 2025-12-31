import { useEffect, useState } from "react";
import AdminLayout from "../Components/AdminLayout";
import api from "../api/axios";
import "./Admin.css";

export default function ManageQueries() {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchQueries();
    }, []);

    const fetchQueries = async () => {
        try {
            setLoading(true);
            const { data } = await api.get("/api/contact"); // Check new route
            setQueries(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this message?")) return;
        try {
            await api.delete(`/api/contact/${id}`);
            fetchQueries();
        } catch (err) {
            alert("Delete failed");
        }
    };

    return (
        <AdminLayout>
            <h1 className="admin-title">Queries & Messages</h1>

            {loading ? <p>Loading...</p> : (
                <div className="admin-card">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Sender</th>
                                <th>Subject</th>
                                <th>Message</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {queries.length === 0 ? (
                                <tr><td colSpan="5">No messages found.</td></tr>
                            ) : (
                                queries.map((q) => (
                                    <tr key={q._id}>
                                        <td>{new Date(q.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <div>{q.name}</div>
                                            <small style={{ color: "#666" }}>{q.email}</small>
                                        </td>
                                        <td>{q.subject}</td>
                                        <td style={{ maxWidth: "300px" }}>{q.message}</td>
                                        <td>
                                            <button className="delete-btn" onClick={() => handleDelete(q._id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </AdminLayout>
    );
}
