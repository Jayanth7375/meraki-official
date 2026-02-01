import { useEffect, useState } from "react";
import AdminLayout from "../Components/AdminLayout";
import api from "../api/axios";
import { Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton, Chip } from "@mui/material";
import { Check as ApproveIcon, Close as RejectIcon } from "@mui/icons-material";

export default function ManageApplications() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const { data } = await api.get("/api/applications");
            setApplications(data);
        } catch (err) {
            console.error(err);
        }
    };

    const updateStatus = async (id, status) => {
        console.log(`[DEBUG] Button Clicked. ID: ${id}, Status: ${status}`);

        if (!window.confirm(`Are you sure you want to ${status} this application?`)) {
            console.log("[DEBUG] User cancelled confirmation");
            return;
        }

        console.log("[DEBUG] Sending API Request...");

        try {
            await api.put(`/api/applications/${id}/status`, { status });
            console.log("[DEBUG] API Request Successful");
            fetchApplications();
        } catch (err) {
            console.error("[DEBUG] API Request Failed", err);
            alert("Failed to update status");
        }
    };

    return (
        <AdminLayout>
            <h1 className="admin-title">Review Applications</h1>

            <div className="admin-card">
                <div className="table-container">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Applicant</strong></TableCell>
                                <TableCell><strong>Department</strong></TableCell>
                                <TableCell><strong>Marks / Cutoff</strong></TableCell>
                                <TableCell><strong>Status</strong></TableCell>
                                <TableCell align="right"><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {applications.map((app) => (
                                <TableRow key={app._id}>
                                    <TableCell>
                                        <div>{app.name}</div>
                                        <div style={{ fontSize: "0.8rem", color: "#666" }}>{app.email}</div>
                                        <div style={{ fontSize: "0.8rem", color: "#666" }}>{app.phone}</div>
                                    </TableCell>
                                    <TableCell>{app.department}</TableCell>
                                    <TableCell>
                                        <div>Marks: <strong>{app.marks}</strong></div>
                                        <div>Cutoff: <strong>{app.cutoff}</strong></div>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={app.status}
                                            color={app.status === "Approved" ? "success" : app.status === "Rejected" ? "error" : "warning"}
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        {app.status === "Pending" && (
                                            <>
                                                <IconButton color="success" onClick={() => updateStatus(app._id, "Approved")}>
                                                    <ApproveIcon />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => updateStatus(app._id, "Rejected")}>
                                                    <RejectIcon />
                                                </IconButton>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AdminLayout>
    );
}
