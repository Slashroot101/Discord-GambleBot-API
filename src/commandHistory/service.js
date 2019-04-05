const { boomify } = require('boom');
const CommandHistory = require('./CommandHistoryModel');

exports.createCommandHistory = async (req, reply) => {
  try {
    const commandHistory = await new CommandHistory(req.body).save();
    return {commandHistory};
  } catch (err)  {
    throw boomify(err);
  }
};

exports.getCommandHistoryWithFilter =  async (req, reply) => {
  try {
    const query = {};

    if(req.query.userID){
      query.userID = req.query.userID;
    }

    if(req.query.startTime){
      query.executionTime = {};
      query.executionTime['$gte'] = new Date(req.query.startTime);
    }

    if(req.query.endTime){
      if(!query.executionTime){
        query.executionTime = {};
      }
      query.executionTime['$lte'] = new Date(req.query.endTime);
    }

    let commandHistory = await CommandHistory.find(query).limit(req.query.limit).exec();
    return {commandHistory};
  } catch (err) {
    throw boomify(err);
  }
};