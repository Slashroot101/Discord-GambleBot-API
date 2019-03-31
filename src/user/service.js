const { boomify } = require('boom');
const User = require('./UserModel');
const mongoose = require('mongoose');

exports.createUser = async (req, resp) => {
  try {
    req.body.createdOn = new Date();
    const user = await new User(req.body);
    return user.save().exec();
  } catch (err) {
    throw boomify(err);
  }
};

exports.deleteUser = async (req, reply) => {
  try {
    const user =  await User.findByIdAndDelete(req.params.id).exec();
    console.log(user)
    if(user !== null){
      return {user}
    } else {
     return reply
              .code(404)
              .send({
                message: 'User could not be found.',
                code: 404,
              });
    }
  } catch (err) {
    throw boomify(err);
  }
};

exports.getUserWithFilter = async (req, reply) => {
  try {
    let query = {};

    if(req.query._id){
      query._id = req.query._id;
    }

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
    return {users: user};
  } catch (err){
    throw boomify(err);
  }
};
