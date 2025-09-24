
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
<<<<<<< HEAD
    console.log('MongoDB Connected...');
=======
    console.log('MongoDB Connected... ');
>>>>>>> 656ce9d182b8afd040758e2df9d80510e1b6de79
  } catch (err) {
    console.error(err.message);
    
    process.exit(1);
  }
};

module.exports = connectDB;