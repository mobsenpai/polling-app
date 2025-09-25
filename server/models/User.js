import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: false,
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
    required: false,
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

const User = mongoose.model('User', UserSchema);

export default User;
