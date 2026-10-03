const ApiError = require('../utils/ApiError');

// A rule: { required, type: 'string'|'array', min, max, pattern, message, label }
// `partial` skips required checks (for updates) but still validates fields that were sent.
const checkField = (field, value, rule) => {
  const label = rule.label || field;
  if (rule.type === 'array') {
    if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
      return `${label} must be an array of strings`;
    }
    return null;
  }
  if (typeof value !== 'string') return `${label} must be a string`;

  const trimmed = value.trim();
  if (rule.min && trimmed.length < rule.min) return `${label} must be at least ${rule.min} characters`;
  if (rule.max && trimmed.length > rule.max) return `${label} must be at most ${rule.max} characters`;
  if (rule.pattern && !rule.pattern.test(trimmed)) return rule.message || `${label} is invalid`;
  return null;
};

const validate = (rules, { partial = false } = {}) => (req, res, next) => {
  const errors = [];

  for (const [field, rule] of Object.entries(rules)) {
    const value = req.body?.[field];
    const missing = value === undefined || value === null || value === '';

    if (missing) {
      if (rule.required && !partial) errors.push(`${rule.label || field} is required`);
      continue;
    }
    const error = checkField(field, value, rule);
    if (error) errors.push(error);
  }

  if (errors.length) return next(new ApiError(400, errors.join(', ')));
  next();
};

module.exports = validate;
