const { boomify } = require('boom');
const User = require('./UserModel');

exports.createUser = async (req, resp) => {
  try {
    req.body.createdOn = new Date();
    req.body.points = {
      currentPoints: 0,
      totalAccruedPoints: 0,
    };
    req.body.commandExecutionMetaData = [];
    req.body.commandHistory = [];
    const user = await new User(req.body).save();
    return {user};
  } catch (err) {
    throw boomify(err);
  }
};

exports.deleteUser = async (req, reply) => {
  try {
    const user =  await User.findByIdAndDelete(req.params.id).exec();
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

exports.getUserLeaderboard = async (req, reply) => {
  try {
    const users = await User
          .find()
          .sort({"points.currentPoints" : req.query.sortOrder})
          .skip(req.query.pageStart)
          .limit(req.query.pageSize * req.query.numPages)
          .exec();
    return {users};
  } catch (err) {
    throw boomify(err);
  }
};

exports.getUserWithFilter = async (req, reply) => {
  try {
    let query = {};
    if(req.query['ids[]']){
      query._id = { $in: req.query['ids[]']};
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

    const user = await User.find(query).limit(Number(req.query.limit)).exec();
    return {users: user};
  } catch (err){
    throw boomify(err);
  }
};
