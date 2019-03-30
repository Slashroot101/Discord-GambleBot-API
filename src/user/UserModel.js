const mongoose = require('mongoose');
mongoose.set('debug', true)
const userSchema = new mongoose.Schema({
  discordUserID: String,
  createdOn: Date,
  role: Number,
});

module.exports = mongoose.model('User', userSchema);
