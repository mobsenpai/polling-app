import User from '../models/User.js'
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cloudinary from '../config/cloudinary.js';
import { sendEmailInWorker } from '../config/createEmailWorker.js';

export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmailInWorker({
      to: email,
      subject: "Reset Your Password",
      html: `
        <h2>Hello ${user.name},</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p><b>This link will expire in 15 minutes.</b></p>
      `,
    });

    return res.status(200).json({ message: "Reset email sent successfully!" });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}


export async function registerUser(req, res) {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload profile picture if provided
    let pfpUrl = null;
    if (req.file && req.file.buffer) {
      pfpUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "user_pfps" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        stream.end(req.file.buffer); // push buffer from multer
      });
    }

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      type: "normal",
      pfp: pfpUrl || "/static/placeholder.jpg", // fallback image
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        name: user.name, 
        email: user.email, 
        type: user.type, 
        pfp: user.pfp
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}


export async function loginUser(req, res) {
  const { email, password, role } = req.body
  try {
    const user = await User.findOne({ email: email, role: role })

    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }
    // console.log(user)
    // Password Matching through bcryptjs
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }

    // Token Generation 
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Setting token in HTTP only cookies
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',  // Securing in production
      sameSite: 'Strict',   // (Prevents CSRF Attacks )
      maxAge: 7 * 24 * 60 * 60 * 1000  // Cookie expiration same as JWT Token
    });

    // Sending the user details so that it could be set in global states
    return res.status(200).json({
      message: "User login successful!", user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        pfp: user.pfp
      }
    })

  } catch (error) {
    // console.error(error)
    return res.status(500).json({ message: "Error in login ", error: error })
  }
}


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
  const { token } = req.body;

  try {
    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const { sub: googleId, email, name, picture } = ticket.getPayload();

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }

      // Generate JWT
      const jwtToken = jwt.sign(
        { id: user._id, email, name: user.name, pfp: user.pfp },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      // Set cookie
      res.cookie('token', jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      // Return user data without role
      return res.status(200).json({
        message: "Google login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          pfp: user.pfp,
          type: 'google'
        }
      });
    }

    // Create new user
    const newUser = await User.create({
      name,
      email,
      googleId,
      pfp: picture || 'uploads/pfps/default-pfp.jpeg',
      type: 'google'
    });

    const jwtToken = jwt.sign(
      { id: newUser._id, email, name: newUser.name, pfp: newUser.pfp },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.cookie('token', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
      message: "Google account registered and logged in",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        pfp: newUser.pfp,
        type: 'google'
      }
    });

  } catch (error) {
    console.error('Error during Google Auth:', error);
    return res.status(500).json({ message: 'Google Authentication failed' });
  }
};


export const logoutUser = (req, res) => {
  // Clears the auth cookie to log the user out
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
  });

  return res.status(200).json({ message: 'User logged out successfully' });
};




export const verifyUserDetails = (req, res) => {
  const user = req.user;

  // User data fetched from middleware and returned to frontend
  return res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    username: user.username || null,
    pfp: user.pfp,
    role: user.role
  });
};

export async function resetPassword(req, res) {
  try {
  
    const { newPassword, token } = req.body;

    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password reset successful!" });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}
