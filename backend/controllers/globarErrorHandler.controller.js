// controllers/globalErrorHandler.controller.js
import CustomError from "../utils/errorResponse.js";

const globalErrorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    // Log error
    console.error("Global error handler:", err);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        error = new CustomError(`Resource not found`, 404);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        error = new CustomError('Duplicate field value entered', 400);
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new CustomError(message, 400);
    }

    // Send error response
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

export default globalErrorHandler;