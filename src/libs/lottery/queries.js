exports.create = lottery => ({
  name: 'create-lottery',
  text: 'INSERT INTO lottery(locality_type, guild_id, start_date, end_date, ticket_cost, max_tickets, is_done) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
  values: [
    lottery.localityType,
    lottery.guildID,
    lottery.startDate,
    lottery.endDate,
    lottery.ticketCost,
    lottery.maxTickets,
    lottery.isDone,
  ],
});

exports.getActiveLotteryForUserByUserID = userID => ({
  name: 'get-lotteries-for-user',
  text: 'SELECT * FROM lottery WHERE user_id = $1 AND is_done = false',
  values: [userID],
});

exports.setLotteryStatus = (lotteryID, isDone) => ({
  name: 'set-lottery-done',
  text: 'UPDATE lottery SET is_done = $2 WHERE id = $1',
  values: [lotteryID, isDone],
});
