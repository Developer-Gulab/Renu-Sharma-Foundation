// controllers/contactController.js

const sendContactMessage = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Basic validation
        if (!name || !email || !message || !phone) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Save to database (optional)
        // Assuming you are using MongoDB
        // const Contact = require("../models/Contact");
        // await Contact.create({ name, email,phone, message });

        // Send email (optional, e.g., using nodemailer)

        // Respond to the user
        return res.status(200).json({ message: "Thank you for contacting us!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while submitting your message." });
    }
};
export{ sendContactMessage };
