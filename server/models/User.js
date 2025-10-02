import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true, // ensures uniqueness only for non-null values
    required: function () {
      return this.type === "google";
    },
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
  type: {
    type: String,
    enum: ["normal", "google"],
    required: true,
  },
  pfp: {
    type: String,
    required: true,
    default: '/uploads/pfp.jpg',
  },
  password: {
    type: String,
    required: function () {
      return this.type === "normal";
    },
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
}, { timestamps: true });


const User = mongoose.model('User', UserSchema);

export default User;
