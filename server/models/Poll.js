const mongoose = require('mongoose');

const PollSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  options: [
    {
      text: String,
      votes: {
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

  createdAt: {
    type: Date,
    default: Date.now,
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

   votes: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      optionIndex: Number,
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Poll', PollSchema);