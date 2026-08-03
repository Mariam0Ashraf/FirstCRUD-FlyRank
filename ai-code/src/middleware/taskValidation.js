const ApiError = require("../errors/ApiError");

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Rejects ids that are not positive whole numbers before any lookup happens,
 * so /tasks/abc is a 400 (malformed request) and not a 404 (missing task).
 */
function validateTaskId(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return next(
      ApiError.badRequest(`'${req.params.id}' is not a valid task id`)
    );
  }

  req.taskId = id;

  return next();
}

function validateCreateTask(req, res, next) {
  const { title } = req.body || {};

  if (!isNonEmptyString(title)) {
    return next(
      ApiError.badRequest("Field 'title' is required and must not be empty")
    );
  }

  req.validatedTask = { title: title.trim() };

  return next();
}

function validateUpdateTask(req, res, next) {
  const { title, done } = req.body || {};

  if (title === undefined && done === undefined) {
    return next(
      ApiError.badRequest("Provide at least one of 'title' or 'done'")
    );
  }

  if (title !== undefined && !isNonEmptyString(title)) {
    return next(ApiError.badRequest("Field 'title' must not be empty"));
  }

  if (done !== undefined && typeof done !== "boolean") {
    return next(ApiError.badRequest("Field 'done' must be true or false"));
  }

  const changes = {};

  if (title !== undefined) {
    changes.title = title.trim();
  }

  if (done !== undefined) {
    changes.done = done;
  }

  req.validatedTask = changes;

  return next();
}

function validateTaskFilters(req, res, next) {
  const { done, search } = req.query;
  const filters = {};

  if (done !== undefined) {
    if (done !== "true" && done !== "false") {
      return next(
        ApiError.badRequest("Query parameter 'done' must be true or false")
      );
    }

    filters.done = done === "true";
  }

  if (search !== undefined) {
    if (!isNonEmptyString(search)) {
      return next(
        ApiError.badRequest("Query parameter 'search' must not be empty")
      );
    }

    filters.search = search.trim();
  }

  req.taskFilters = filters;

  return next();
}

module.exports = {
  validateTaskId,
  validateCreateTask,
  validateUpdateTask,
  validateTaskFilters,
};
