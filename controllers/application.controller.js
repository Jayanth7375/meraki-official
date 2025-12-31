import Application from "../models/Application.js";
import axios from "axios";

/* SUBMIT APPLICATION (PUBLIC) */
export const submitApplication = async (req, res) => {
    try {
        const { name, email, phone, department, marks, cutoff } = req.body;

        // Basic validation
        if (!name || !email || !department || !marks || !cutoff) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const application = await Application.create({
            name,
            email,
            phone,
            department,
            marks,
            cutoff,
        });

        res.status(201).json({ message: "Application submitted successfully!", application });
    } catch (err) {
        console.error("Submit Application Error:", err);
        res.status(500).json({ message: "Failed to submit application" });
    }
};

/* GET ALL APPLICATIONS (ADMIN) */
export const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find().sort({ createdAt: -1 });
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch applications" });
    }
};

/* UPDATE STATUS (ADMIN) */
export const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        console.log(`[DEBUG] Update Application Status called. ID: ${id}, Status: ${status}`);

        if (!["Approved", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const application = await Application.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        if (status === "Approved") {
            try {
                // REPLACE THIS WITH YOUR n8n WEBHOOK URL
                const WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || "https://your-n8n-instance.com/webhook/test";

                console.log("Attempting to trigger n8n Webhook at:", WEBHOOK_URL);

                // Only send if URL is configured
                if (WEBHOOK_URL && !WEBHOOK_URL.includes("your-n8n-instance")) {
                    const response = await axios.post(WEBHOOK_URL, {
                        name: application.name,
                        email: application.email,
                        department: application.department,
                        status: "Approved",
                        message: "Congratulations! Your application has been approved."
                    });
                    console.log("n8n Webhook Triggered Successfully. Response Status:", response.status);
                } else {
                    console.log("n8n Webhook URL not configured, skipping automation.");
                }
            } catch (webhookErr) {
                console.error("Failed to trigger n8n webhook. Reason:", webhookErr.code || webhookErr.message);
                if (webhookErr.response) {
                    console.error("n8n Response Data:", webhookErr.response.data);
                }
            }
        }

        res.json({ message: `Application ${status}`, application });
    } catch (err) {
        console.error("Update Status Error:", err);
        res.status(500).json({ message: "Failed to update status" });
    }
};
