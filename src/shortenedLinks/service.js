const { boomify } = require('boom');
const ShortenedLink = require('./ShortenedLinkModel');
const ObjectId = require('mongoose').Types.ObjectId;
const dns = require('dns');
const URL = require('url').URL;
const config = require('../../config');


exports.createShortenedLink = async(req, res) => {
  return new Promise((resolve, reject) => {
	try {
		req.body.shortCode = new ObjectId();
		req.body.createdOn = new Date();
		let originalUrl = new URL(req.body.originalUrl);
		dns.lookup(originalUrl.hostname, async (err) => {
			if(err) reject(err);
			let shortenedLink = await new ShortenedLink(req.body).save();
			const hostname = config.hostname;
			resolve({shortenedLink: {
				...shortenedLink._doc,
				hostname,
			}});
		});
	  } catch (err) {
		throw boomify(err);
	  }
  })
};