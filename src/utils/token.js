const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn, cookieExpiresDays, isProduction } = require('../config/env');

const COOKIE_NAME = 'token';

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: isProduction,
};

const signToken = (userId) => jwt.sign({ id: userId }, jwtSecret, { expiresIn: jwtExpiresIn });

const verifyToken = (token) => jwt.verify(token, jwtSecret);

const setTokenCookie = (res, token) =>
  res.cookie(COOKIE_NAME, token, {
    ...cookieOptions,
    maxAge: cookieExpiresDays * 24 * 60 * 60 * 1000,
  });

const clearTokenCookie = (res) => res.clearCookie(COOKIE_NAME, cookieOptions);

module.exports = { COOKIE_NAME, signToken, verifyToken, setTokenCookie, clearTokenCookie };
