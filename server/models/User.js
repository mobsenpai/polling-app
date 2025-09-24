
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },


  profilePic: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  votedin: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Poll',
    },
  ],
  createdPolls: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Poll',
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);