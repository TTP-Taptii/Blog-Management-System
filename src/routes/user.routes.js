const router = require('express').Router();
const { getMe, updateMe } = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { updateProfileRules } = require('../validators/user.validator');

router.use(protect);

router.route('/me').get(getMe).put(validate(updateProfileRules, { partial: true }), updateMe);

module.exports = router;
