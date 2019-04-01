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

exports.getCommand = async(req, resp) => {
  const query = {};
  
};