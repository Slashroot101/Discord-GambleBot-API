const db = require('../database');
const LotteryTickets = require('./queries');

exports.create = (userID, lotteryID) => new Promise(async (resolve) => {
  const lotteryTicket = await db.query(LotteryTickets.create(userID, lotteryID));
  resolve(lotteryTicket.rows[0]);
});

exports.getForUser = (userID, lotteryID) => new Promise(async (resolve) => {
  const numTickets = await db.query(LotteryTickets.getTicketsForUser(userID, lotteryID));
  resolve(numTickets.rows[0]);
});

exports.getNumberOfTotalTickets = lotteryID => new Promise(async (resolve) => {
  const totalTickets = await db.query(LotteryTickets.getNumberOfTotalTickets(lotteryID));
  resolve(totalTickets.rows[0]);
});
