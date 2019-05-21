const { boomify } = require('boom');
const ShortenedLink = require('./ShortenedLinkModel');
const ObjectId = require('mongoose').Types.ObjectId;

exports.createShortenedLink = async(req, res) => {
  try {
	req.body.shortCode = new ObjectId();
	req.body.createdOn = new Date();
	const shortenedLink = await new ShortenedLink(req.body).save();
	console.log(shortenedLink)
    return {shortenedLink};
  } catch (err) {
    throw boomify(err);
  }
};