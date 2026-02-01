import Query from "../models/Query.js";

/* SUBMIT QUERY (PUBLIC) */
export const submitQuery = async (req, res) => {
    try {
        const { fname, lname, email, phone, subject, message } = req.body;

        const fullName = `${fname} ${lname}`.trim();

        const query = await Query.create({
            name: fullName,
            email,
            phone,
            subject,
            message,
        });

        res.status(201).json({ message: "Query submitted successfully", query });
    } catch (err) {
        res.status(500).json({ message: "Failed to submit query", error: err.message });
    }
};

/* GET ALL QUERIES (ADMIN) */
export const getQueries = async (req, res) => {
    try {
        const queries = await Query.find().sort({ createdAt: -1 });
        res.json(queries);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch queries" });
    }
};

/* DELETE QUERY (ADMIN) */
export const deleteQuery = async (req, res) => {
    try {
        await Query.findByIdAndDelete(req.params.id);
        res.json({ message: "Query deleted" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete query" });
    }
};
