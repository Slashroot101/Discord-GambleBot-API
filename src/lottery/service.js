const { boomify } = require('boom');
const Lottery = require('./LotteryModel');

exports.createLottery = async (req, reply) => {
  try {
    const lottery = await new Lottery(req.body).save();
    return {lottery};
  } catch (err) {
    throw boomify(err);
  }
};

exports.update = async (req, reply) => {
  try {
    const query = {};

    if(req.body.tickets){
      query['$push'] = {tickets: req.body.tickets};
    }

    if('isDone' in req.body){
      query.isDone = req.body.isDone;
    }

    if('isQueued' in req.body){
      query.isQueued = req.body.isQueued;
    }

    if(req.body.winner){
      query.winner = req.body.winner;
    }

    const lottery = await Lottery.findOneAndUpdate(
      {_id: req.params.id},
      query,
      {new: true},
    ).exec();

    return {lottery};

  } catch (err) {
    throw boomify(err);
  }
};

exports.getWithFilter = async (req, reply) => {
  try {
    const query = {};
    if(req.query.guildID) {
      query.guildID = req.query.guildID;
    }

    if(req.query.startDate){
      query.startDate = req.query.startDate;
    }

    if(req.query.endDate){
      query.endDate = req.query.endDate;
    }

    if('isQueued' in req.query){
      query.isQueued = req.query.isQueued;
    }

    if('isDone' in req.query){
      query.isDone = req.query.isDone;
    }

    if(req.query.winner){
      query.winner = req.query.winner;
    }
  } catch (err) {
    throw boomify(err);
  }
};
