const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  discordUserID: {
    type: String,
    required: true,
    unique: true,
  },
  createdOn: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  points: {
    currentPoints: {
      type: Number,
      required: true,
      default: 0,
    },
    totalAccruedPoints: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  commandExecutionMetaData: [{
    commandID: { type: mongoose.Schema.Types.ObjectId, ref: 'Command' },
    netPoints: Number,
    numExecutions: Number,
  }],
});

module.exports = mongoose.model('User', userSchema);
