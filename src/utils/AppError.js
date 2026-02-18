class AppError extends Error {
  /**
   * @param {string} message - Error message to show
   * @param {number} statusCode - HTTP status code
   * @param {boolean} isOperational - Whether this is a known error vs programming error
   */
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { AppError };
