const { boomify } = require('boom');
const User = require('./UserModel');
const mongoose = require('mongoose');

exports.createUser = async (req, resp) => {
  try {

    console.log(mongoose.connection.readyState);
    req.body.createdOn = new Date();
    const user = await new User(req.body);
    console.log(user);
    return user.save();
  } catch (err) {
    console.log(err)
    throw boomify(err);
  }
};

exports.getUserWithFilter = async (req, reply) => {
  try {
    let query = {};

    if(req.query.discordUserID){
      query.discordUserID = req.query.discordUserID;
    }

    if(req.query.role){
      query.role = req.query.role;
    }

    if(req.query.createdOn){
      query.createdOn = req.query.createdOn;
    }
    const user = await User.find(query).exec();
    console.log(user)
    return {users: user};
  } catch (err){
    throw boomify(err);
  }
};
