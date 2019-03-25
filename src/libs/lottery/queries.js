exports.create = lottery => ({
  name: 'create-lottery',
  text: `INSERT INTO lottery(locality_type, guild_id, start_date, end_date, ticket_cost, max_tickets, is_done) VALUES ($1, $2, now(), now() + INTERVAL '1' hour * $3, $4, $5, $6) RETURNING *`,
  values: [
    lottery.localityType,
    lottery.guildID,
    lottery.duration,
    lottery.ticketCost,
    lottery.maxTickets,
    lottery.isDone,
  ],
});

exports.getAllExpiredLotteries = () => ({
  name: 'get-expired-lottery',
  text: 'SELECT * FROM lottery WHERE end_date <= NOW() AND is_done = false AND is_queued = false',
  values: [],
});

exports.getActiveLotteryForUserByUserID = userID => ({
  name: 'get-lotteries-for-user',
  text: 'SELECT * FROM lottery WHERE created_by = $1 AND is_done = false',
  values: [userID],
});

exports.setLotteryStatus = (lotteryID, isDone) => ({
  name: 'set-lottery-done',
  text: 'UPDATE lottery SET is_done = $2 WHERE id = $1',
  values: [lotteryID, isDone],
});

exports.getLotteryWinner = lotteryID => ({
  name: 'get-lottery-winner',
  text: 'SELECT * FROM lottery_tickets JOIN lottery on lottery_tickets.lottery_id = lottery.id WHERE lottery_id = $1 ORDER BY RANDOM() LIMIT 1',
  values: [lotteryID],
});

exports.findPossibleOverlap = (duration, guildID) => ({
  name: 'get-overlap-lottery',
  text: `SELECT * FROM lottery WHERE end_date <= now() + INTERVAL '1' hour * $1 AND guild_id = $2`,
  values: [duration, guildID],
});

exports.getLotteryJackpot = lotteryID => ({
  name: 'get-jackpot',
  text: 'SELECT * FROM lottery_jackpots WHERE lottery_id = $1',
  values: [lotteryID],
});

exports.getLotteryByID = lotteryID => ({
  name: 'get-lottery-by-id',
  text: 'SELECT * FROM lottery WHERE id = $1',
  values: [lotteryID],
});

exports.getLotteryForGuildByDiscordGuildID = guildID => ({
  name: 'get-lottery-for-guild',
  text: 'SELECT * FROM lottery JOIN guilds on guilds.id = lottery.guild_id where guilds.guild_id = $1 and is_done = false',
  values: [guildID]
});

exports.setConsumedByQueue = lotteryID => ({
  name: 'set-consumed-by-queue',
  text: 'UPDATE lottery SET is_queued = true WHERE id = $1 RETURNING *',
  values: [lotteryID],
});

exports.setWinner = (lotteryID, userID) => ({
  name: 'set-lottery-winner',
  text: 'UPDATE lottery SET winner = $1 WHERE id = $2',
  values: [userID, lotteryID],
});
