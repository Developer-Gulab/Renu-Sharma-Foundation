class CustomError extends Error {
  /**
   * Custom Error class for more structured error handling
   * @param {string} message - The error message
   * @param {number} statusCode - HTTP status code for the error
   * @param {object} [details] - Optional additional details about the error
   */
  constructor(message, statusCode, details = null) {
    super(message);

    // Set the status code
    this.statusCode = statusCode;

    // Optionally include additional details for the error
    if (details) {
      this.details = details;
    }

    // Ensure the stack trace is correctly captured
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
