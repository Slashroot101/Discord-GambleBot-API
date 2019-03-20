exports.create = (userID, lotteryID, numTickets) => ({
  name: 'create-lottery-ticket',
  text: 'INSERT INTO lottery_tickets(lottery_id, user_id) VALUES ($2, $1) RETURNING *',
  values: [userID, lotteryID],
});

exports.getTicketsForUser = (userID, lotteryID) => ({
  name: 'get-number-lottery-tickets',
  text: 'SELECT * FROM lottery_tickets WHERE user_id = $1 and lottery_id = $2',
  values: [userID, lotteryID],
});

exports.getNumberOfTotalTickets = lotteryID => ({
  name: 'get-total-tickets',
  text: 'SELECT SUM(num_tickets) FROM user_lottery_tickets WHERE lottery_id = $1',
  values: [lotteryID]
});
