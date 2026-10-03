const ApiError = require('../utils/ApiError');
const sendResponse = require('../utils/sendResponse');
const { isProduction } = require('../config/env');

const notFound = (req, res, next) => next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));

// Maps known library errors to an ApiError so the handler below has a single exit.
const normalizeError = (err) => {
  if (err instanceof ApiError) return err;
  if (err.name === 'CastError') return new ApiError(400, `Invalid ${err.path}: ${err.value}`);
  if (err.name === 'ValidationError') {
    return new ApiError(400, Object.values(err.errors).map((e) => e.message).join(', '));
  }
  if (err.code === 11000) {
    return new ApiError(409, `${Object.keys(err.keyValue)[0]} already exists`);
  }
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return new ApiError(401, 'Invalid or expired token');
  }
  if (err.type === 'entity.parse.failed') return new ApiError(400, 'Malformed JSON body');
  return null;
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const known = normalizeError(err);
  if (known) return sendResponse(res, known.statusCode, known.message);

  console.error(err);
  return sendResponse(res, 500, isProduction ? 'Internal server error' : err.message);
};

module.exports = { notFound, errorHandler };
