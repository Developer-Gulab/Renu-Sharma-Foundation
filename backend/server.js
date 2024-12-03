import express from "express";
import { config } from "dotenv";
import cors from "cors";
import connectToDatabase from "./config/DataBase.js";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import winston from "winston";
import globalErrorHandler from "./controllers/globarErrorHandler.controller.js";

config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
connectToDatabase();

// Create a logger
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            handleExceptions: true,
        }),
    ],
    exitOnError: false,
});

// Middleware to log requests
const requestLogger = (req, res, next) => {
    const { method, url } = req;
    logger.info({
        message: "Incoming request",
        method,
        url,
    });
    next();
};

// CORS configuration
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        credentials: true,
    })
);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

// Routes
app.use("/api", routes);

app.use(globalErrorHandler);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is Running at port ${port}`);
    logger.info(`Server is Running at port ${port}`);
});

export default app;