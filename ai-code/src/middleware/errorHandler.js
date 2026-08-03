const ApiError = require("../errors/ApiError");

/**
 * Turns every error raised in the app into a JSON response of the same shape:
 * { "error": "..." }
 */
function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Request body is not valid JSON" });
  }

  console.error(err);

  return res.status(500).json({ error: "Internal server error" });
}

module.exports = errorHandler;
