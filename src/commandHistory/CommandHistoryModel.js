const mongoose = require('mongoose');

const commandHistorySchema = new mongoose.Schema({
  commandID: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Command',
  },
  executionTime: {
    type: Date,
  },
  userID: {
   type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  points: {
    type: Number,
  },
});

module.exports = mongoose.model('CommandHistory', commandHistorySchema);
