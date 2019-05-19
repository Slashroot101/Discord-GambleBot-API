const { boomify } = require('boom');
const ShortenedLink = require('./ShortenedLinkModel');
const ObjectId = require('mongoose').Schema.Types.ObjectId;

exports.createShortenedLink = async(req, res) => {
  try {
    req.body.shortCode = new ObjectId();
    const shortenedLink = await new ShortenedLink(req.body).save();
    return {shortenedLink};
  } catch (err) {
    throw boomify(err);
  }
};