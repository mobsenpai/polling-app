const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
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
  status: {
    isLive: {
      type: Boolean,
      default: false, 
    },
    isEnded: {
      type: Boolean,
      default: false,
    }
  },

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  visibility: {
    type: String,
    enum: ['private', 'public'], 
    default: 'private',
  },
  totalVotes:{
    type:Number,
    default:0
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Poll', PollSchema);