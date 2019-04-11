const mongoose = require('mongoose');

const guildModel = new mongoose.Schema({
  discordGuildID: {
    type: String,
    unique: true,
    required: true,
  },
  isGlobal: {
    type: Boolean,
    required: true,
    default: false,
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
    type: Date,
    required: true,
  },
  disabledCommands: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Command',
  }],
  prefix: {
    type: 'String',
    required: true,
    default: '!',
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
    }
  },
});

module.exports = mongoose.model('Guild', guildModel);
