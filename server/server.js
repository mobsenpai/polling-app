

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const passport = require('passport');
const session = require('cookie-session');
const http = require('http'); 
const { Server } = require("socket.io"); 

require('./config/passport')(passport);

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); 
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"]
    }
});


io.on('connection', (socket) => {
    console.log('A user connected via WebSocket ✅');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
  })
);


app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());


app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use('/auth', require('./routes/authRoutes'));
app.use('/polls', require('./routes/pollRoutes'));

const PORT = process.env.PORT || 5000;


server.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));


module.exports.io = io;