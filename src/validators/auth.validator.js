const phoneNumber = {
  required: true,
  type: 'string',
  pattern: /^\+?[0-9]{7,15}$/,
  message: 'phoneNumber must be 7-15 digits (optional leading +)',
};

const registerRules = {
  name: { required: true, type: 'string', min: 2, max: 60 },
  email: {
    required: true,
    type: 'string',
    pattern: /^\S+@\S+\.\S+$/,
    message: 'email must be a valid email address',
  },
  password: { required: true, type: 'string', min: 6, max: 72 },
  phoneNumber,
};

const loginRules = {
  email: registerRules.email,
  password: { required: true, type: 'string' },
};

module.exports = { registerRules, loginRules };
