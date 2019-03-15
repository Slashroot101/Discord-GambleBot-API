const db = require('../database');
const Lottery = require('./queries');

exports.create = lotteryObject => new Promise(async (resolve) => {
  const lottery = await db.query(Lottery.create(
    lotteryObject.localityType,
    lotteryObject.guildID,
    lotteryObject.startDate,
    lotteryObject.endDate,
    lotteryObject.ticketCost,
    lotteryObject.maxTickets,
    lotteryObject.isDone,
  ));
  resolve(lottery.rows[0]);
});

exports.getActiveLotteryForUserByUserID = userID => new Promise(async (resolve) => {
  const activeLotteries = await db.query(Lottery.getActiveLotteryForUserByUserID(userID));
  resolve(activeLotteries.rows[0]);
});

exports.setLotteryStatus = (lotteryID, isDone) => new Promise(async (resolve) => {
  const updatedLottery = await db.query(Lottery.setLotteryStatus(lotteryID, isDone));
  resolve(updatedLottery.rows[0]);
});
