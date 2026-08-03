const ApiError = require("../errors/ApiError");

/**
 * Catches any request that matched no route and hands it to the error handler,
 * so unknown paths answer with JSON instead of Express' default HTML page.
 */
function notFound(req, res, next) {
  next(ApiError.notFound(`Route ${req.method} ${req.originalUrl} not found`));
}

module.exports = notFound;
