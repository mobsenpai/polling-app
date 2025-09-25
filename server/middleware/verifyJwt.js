// middleware/verifyJWT.js
import jwt, { verify } from 'jsonwebtoken';
import User from '../models/User.js'

const verifyJWT = async (req, res, next) => {
    try {
        // Looking for token in cookies
        const token = req.cookies?.token;
        // No token found
        if (!token) {
            return res.status(403).json({ message: 'Access denied, no token provided' });
        }

        // Verifying token
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }

            // Token verified — fetching user
            const user = await User.findById(decoded.id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // User verified — attaching to req and moving on
            req.user = user;
            next();
        });
    } catch (error) {
        console.error('JWT verification failed:', error);
        res.status(500).json({ message: 'Authentication failed' });
    }
};



export default verifyJWT;