import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  googleAuth,
  verifyUserDetails
} from '../controllers/AuthController.js';
import ensureAuth from '../middleware/verifyJwt.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/google', googleAuth);
router.get('/logout', ensureAuth, logoutUser);
router.get('/verify-user', ensureAuth, verifyUserDetails);

export default router;
