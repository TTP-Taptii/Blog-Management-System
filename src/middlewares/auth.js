const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const { COOKIE_NAME, verifyToken } = require('../utils/token');

const extractToken = (req) => {
  if (req.cookies?.[COOKIE_NAME]) return req.cookies[COOKIE_NAME];
  const header = req.headers.authorization;
  return header?.startsWith('Bearer ') ? header.split(' ')[1] : null;
};

const protect = async (req, res, next) => {
  const token = extractToken(req);
  if (!token) throw new ApiError(401, 'Not authenticated. Please log in');

  const { id } = verifyToken(token); // JWT errors are mapped to 401 in error.js
  const user = await User.findById(id);
  if (!user) throw new ApiError(401, 'User belonging to this token no longer exists');

  req.user = user;
  next();
};

module.exports = { protect };
