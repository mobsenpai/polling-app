import cookie from 'cookie'; 
import jwt from 'jsonwebtoken'

const authenticateSocket = (socket, next) => {
  try {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const token = cookies.token; // handles both and normal Token
    if (!token) throw new Error("No token");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();

  } catch (err) {
    // console.log("Socket auth error:", err.message);
    next(new Error("Authentication error"));
  }
};

export default authenticateSocket;