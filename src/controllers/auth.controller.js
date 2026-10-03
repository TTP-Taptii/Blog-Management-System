const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const sendResponse = require('../utils/sendResponse');
const pick = require('../utils/pick');
const { signToken, setTokenCookie, clearTokenCookie } = require('../utils/token');

const register = async (req, res) => {
  const user = await User.create(pick(req.body, ['name', 'email', 'password', 'phoneNumber']));
  sendResponse(res, 201, 'Registration successful', user);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

  // Same message for unknown email and wrong password to avoid leaking which accounts exist.
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = signToken(user._id);
  setTokenCookie(res, token);
  sendResponse(res, 200, 'Login successful', { user, token });
};

const logout = (req, res) => {
  clearTokenCookie(res);
  sendResponse(res, 200, 'Logged out');
};

module.exports = { register, login, logout };
