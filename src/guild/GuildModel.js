const mongoose = require('mongoose');

const guildModel = new mongoose.Schema({
  discordID: {
    type: String,
    unique: true,
    required: true,
  },
  bank: {
    currentBalance: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPointsGained: {
      type: Number,
      required: true,
      default: 0,
    }
  },
  createdOn: {
    type: Number,
    required: true,
  },
  disabledCommands: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Command'
  }],
});

module.exports = mongoose.model('Guild', guildModel);