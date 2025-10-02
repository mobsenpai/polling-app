import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  googleAuth,
  resetPassword,
  forgotPassword,
  verifyUserDetails
} from '../controllers/AuthController.js';
import ensureAuth from '../middleware/verifyJwt.js';
import upload from '../middleware/multer.js';
const router = express.Router();

router.post('/register', upload.single('pfp'), registerUser);
router.post('/login', loginUser);
router.post('/google', googleAuth);
router.get('/logout', ensureAuth, logoutUser);
router.get('/verify-user', ensureAuth, verifyUserDetails);
router.post('/reset-password', resetPassword);
router.post("/forgot-password", forgotPassword);

export default router;
