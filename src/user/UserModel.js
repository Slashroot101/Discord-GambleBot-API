const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  discordUserID: String,
  createdOn: Date,
  role: Number,
  points: {
    currentPoints: Number,
    totalAccruedPoints: Number,
  },
  commandHistory: [{
    commandID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Command',
    },
    netPoints: Number,
    executedOn: Date
  }],
});

module.exports = mongoose.model('User', userSchema);
