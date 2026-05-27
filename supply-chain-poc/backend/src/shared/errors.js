class AppError extends Error {
  constructor(code, message, status, details) {
    super(message);
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

function asyncHandler(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

function notFoundHandler(_req, _res, next) {
  next(new AppError("not_found", "Resource not found", 404));
}

function errorHandler(err, _req, res, _next) {
  if (err instanceof AppError) {
    const response = {
      error: {
        code: err.code,
        message: err.message,
      },
    };

    if (err.details) {
      response.error.details = err.details;
    }

    res.status(err.status).json(response);
    return;
  }

  console.error(err);
  res.status(500).json({
    error: {
      code: "internal_error",
      message: "An unexpected error occurred",
    },
  });
}

module.exports = {
  AppError,
  asyncHandler,
  errorHandler,
  notFoundHandler,
};
