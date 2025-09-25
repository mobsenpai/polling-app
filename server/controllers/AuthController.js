import User from '../models/User.js'
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


export async function forgotPassword () {
  
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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      type: "normal"
    });

    await user.save();

    const { password: pwd, ...userData } = user.toObject();
    res.status(201).json({ message: "User registered successfully", user: userData });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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
        role: user.role,
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
    // Google token received and verified successfully
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    // User details extracted from the verified token
    const { sub: googleId, email, name, picture } = ticket.getPayload();

    // Checking if a user with this email already exists
    let user = await User.findOne({ email });

    if (user) {
      // User found — checking if googleId is already linked
      if (!user.googleId) {
        // googleId not linked yet — adding it to the existing user
        user.googleId = googleId;
        await user.save();
      }

      // JWT generated for the existing user
      const jwtToken = jwt.sign(
        { id: user._id, email, name: user.name, pfp: user.pfp },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      // Token set in cookie
      res.cookie('token', jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      // Returning existing user data
      return res.status(200).json({
        message: "Google login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          pfp: user.pfp
        }
      });
    }

    // No existing user found — proceeding with account creation
    const newUser = await User.create({
      name,
      email,
      googleId,
      role: 'customer',
      pfp: picture || 'uploads/pfps/default-pfp.jpeg'
    });

    // JWT generated for the new user
    const jwtToken = jwt.sign(
      { id: newUser._id, email, name: newUser.name, pfp: newUser.pfp },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Token set in cookie for the new user
    res.cookie('token', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // Returning newly created user data
    return res.status(201).json({
      message: "Google account registered and logged in",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        pfp: newUser.pfp
      }
    });

  } catch (error) {
    // Something went wrong during the auth process
    console.error('Error during Google Auth:', error);
    return res.status(500).json({ message: 'Google Authentication failed' });
  }
};


export const logoutUser = (req, res) => {
  // Clears the auth cookie to log the user out
  console.log("asdflkajsdflkjasdlfkj")
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


