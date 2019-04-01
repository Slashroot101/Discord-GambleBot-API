const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  discordUserID: String,
  createdOn: Date,
  role: Number,
  points: {
    currentPoints: Number,
    totalAccruedPoints: Number,
  },
});

module.exports = mongoose.model('User', userSchema);
