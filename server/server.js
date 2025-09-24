const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const passport = require('passport');
const session = require('cookie-session');
const connectDB = require('./config/db');

dotenv.config();
require('./config/passport')(passport);
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

io.on('connection', (socket) => {
  console.log('A user connected via WebSocket ');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.use('/auth', require('./routes/auth'));
app.use('/api/polls', require('./routes/polls'));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT} `));

module.exports.io = io;