const mongoose = require('mongoose');

const guildModel = new mongoose.Schema({
  discordGuildID: {
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
  communicationChannel: {
    onlyAllowCommunicationsHere: {
      type: Boolean,
      required: true,
      default: false,
    },
    discordChannelID: {
      type: String,
      required: true,
      default: '',
    },
    isChannelSet: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  disabledCommands: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Command'
  }],
});

module.exports = mongoose.model('Guild', guildModel);