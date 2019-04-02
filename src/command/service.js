const { boomify } = require('boom');
const Command = require('./CommandModel');

exports.createCommand = async (req, resp) => {
  try {
    const command = new Command(req.body);
    return command.save();
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

    if(req.query.id) {
      query._id = req.query.id
    }

    const command = await Command.find(query).exec();
    return {command};
  } catch (err){
    throw boomify(err);
  }
};