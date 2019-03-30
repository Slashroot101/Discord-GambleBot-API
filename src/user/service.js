const { boomify } = require('boom');
const User = require('./UserModel');

exports.createUser = async (req, resp) => {
  try {
    req.body.createdOn = new Date();
    const user = await new User(req.body);
    return user;
  } catch (err) {
    throw boomify(err);
  }
};
