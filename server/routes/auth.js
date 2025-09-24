const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} = require('../controllers/AuthController');

const verifyUser = require('../middleware/auth.js')

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/' }),
  (req, res) => {
    res.redirect('http://localhost:3000/dashboard');
  }
);

router.get("api/auth/verify", verifyUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.status(201).json({ user, msg: "Token is valid" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get('/logout', logoutUser);

router.get('/me', getMe);

module.exports = router;