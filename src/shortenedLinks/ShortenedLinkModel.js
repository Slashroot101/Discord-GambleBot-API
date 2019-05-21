const mongoose = require('mongoose');

const shortenedLink = new mongoose.Schema({
  createdBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdOn: {
    type: Date,
    required: true,
  },
  originalUrl: {
    type: String,
	required: true,
	unique: true,
  },
  shortCode: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('ShortenedLink', shortenedLink);
