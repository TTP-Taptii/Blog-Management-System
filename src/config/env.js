require('dotenv').config();

const required = ['MONGO_URI', 'JWT_SECRET'];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  throw new Error(`Missing required env variables: ${missing.join(', ')}`);
}

module.exports = {
  port: process.env.PORT || 5000,
  isProduction: process.env.NODE_ENV === 'production',
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  cookieExpiresDays: Number(process.env.COOKIE_EXPIRES_DAYS) || 7,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
};
