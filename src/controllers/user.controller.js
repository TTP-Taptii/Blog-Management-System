const sendResponse = require('../utils/sendResponse');
const pick = require('../utils/pick');

const getMe = (req, res) => sendResponse(res, 200, 'Profile fetched', req.user);

const updateMe = async (req, res) => {
  req.user.set(pick(req.body, ['name', 'phoneNumber']));
  await req.user.save();
  sendResponse(res, 200, 'Profile updated', req.user);
};

module.exports = { getMe, updateMe };
