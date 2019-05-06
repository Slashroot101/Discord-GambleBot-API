const mongoose = require('mongoose');

const LotterySchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  guildID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guild',
  },
  ticketCost: {
    type: Number,
    required: true,
  },
  minTickets: {
    type: Number,
    required: true,
  },
  maxTickets: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  currentJackpot: {
    type: Number,
    default: 0,
    required: true,
  },
  isQueued: {
    type: Boolean,
    required: true,
    default: false,
  },
  isDone: {
    type: Boolean,
    required: true,
    default: false,
  },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdInChannel: {
    type: String,
    required: true,
  },
  localityType: {
    type: String
  },
  tickets: [{
    purchaseDate: {
      type: Date,
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
});


module.exports = mongoose.model('Lottery', LotterySchema);
