import mongoose from 'mongoose';

const PollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      text: String,
      count: {
        type: Number,
        default: 0,
      },
    },
  ],
  multicasting: {
    type: String,
    default: true,
  },
  isLive: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  visibility: {
    type: String,
    type: Boolean,
    default: false
  },
  start: {
    type: Date,
    default: Date.now,
  },
  end: {
    type: Date,
    required: true,
  },
  totalVotes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Poll = mongoose.model('Poll', PollSchema);

export default Poll;
