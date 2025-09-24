const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} = require('../controllers/AuthController');

router.post('/api/auth/register', registerUser);

router.post('/api/auth/login', loginUser);

router.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/' }),
  (req, res) => {
    res.redirect('http://localhost:3000/dashboard');
  }
);

router.get('/api/auth/logout', logoutUser);

router.get('/api/auth/me', getMe);

module.exports = router;