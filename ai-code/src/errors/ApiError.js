/**
 * An error that carries the HTTP status code it should be answered with.
 * Anything thrown that is not an ApiError is treated as an unexpected 500.
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }

  static badRequest(message) {
    return new ApiError(400, message);
  }

  static notFound(message) {
    return new ApiError(404, message);
  }
}

module.exports = ApiError;
