const { registerRules } = require('./auth.validator');

// Reuses the registration rules so a field is defined (and changed) in exactly one place.
const updateProfileRules = {
  name: registerRules.name,
  phoneNumber: registerRules.phoneNumber,
};

module.exports = { updateProfileRules };
