const { boomify } = require('boom');
const Command = require('./CommandModel');

exports.createCommand = async (req, resp) => {
  try {
    const command = await new Command(req.body).save();
    return {command: command};
  } catch (err) {
    throw boomify(err);
  }
};

exports.getCommandWithFilter = async(req, resp) => {
  const query = {};
  try {
    if(req.query.name) {
      query.name = req.query.name;
    }

    if(req.query['ids[]']){
      query._id = { $in: req.query['ids[]']};
    }

    const command = await Command.find(query).limit(req.query.limit).exec();
    return {commands: command};
  } catch (err){
    throw boomify(err);
  }
};

exports.updateCommand = async(req, resp) => {
  try {
    const command = await Command
      .findOneAndUpdate(
        { _id: req.body._id },
        { $set: req.body },
        { new:true }
        ).exec();
    return {command};
  } catch (e) {
    throw boomify(e);
  }
};

exports.deleteCommand = async (req, reply) => {
  try {
    const command =  await Command.findByIdAndDelete(req.params.id).exec();
    if(command !== null){
      return {command}
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
