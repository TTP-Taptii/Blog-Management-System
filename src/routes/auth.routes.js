const router = require('express').Router();
const { register, login, logout } = require('../controllers/auth.controller');
const validate = require('../middlewares/validate');
const { registerRules, loginRules } = require('../validators/auth.validator');

router.post('/register', validate(registerRules), register);
router.post('/login', validate(loginRules), login);
router.post('/logout', logout);

module.exports = router;
