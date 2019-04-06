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

};
