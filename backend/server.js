const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//testing

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes (add your routes in the `routes` folder)
app.use("/api", require("./routes/someRoutesFile")); // Example route file

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
