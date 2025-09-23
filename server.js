
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');



const app = express();
connectDB();


app.use(cors());


app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;




app.listen(PORT, () => console.log(`Server running on port ${PORT} 🔥`));