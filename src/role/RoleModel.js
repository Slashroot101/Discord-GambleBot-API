const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  isSuperUser: {
    type: Boolean,
    required: true,
    default: false,
  },
  hasAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model('Role', roleSchema);
