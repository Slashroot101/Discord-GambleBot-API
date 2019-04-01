const mongoose = require('mongoose');

const commandSchema = new mongoose.Schema({
  name: String,
  description: String,
  costData: {
    cost: Number,
    hasCost: Boolean,
  },
  allowedRoles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  }],
  cooldown: {
   executionPerMinute: Number,
   cooldownInMinutes: Number,
  },
});

module.exports = mongoose.model('Command', commandSchema);