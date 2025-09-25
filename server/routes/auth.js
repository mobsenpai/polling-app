import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  googleAuth, 
} from '../controllers/AuthController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/google', googleAuth);
router.get('/logout', logoutUser);

export default router;
