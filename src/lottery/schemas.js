const lotteryObject = {
  userID: { type: 'string'},
  guildID: { type: 'string' },
  ticketCost: { type: 'number' },
  minTickets: { type: 'number' },
  maxTickets: { type: 'number' },
  startDate: { type: 'string' },
  endDate: { type: 'string' },
  currentJackpot: { type: 'number' },
  isQueued: { type: 'boolean' },
  isDone: { type: 'boolean' },
  winner: { type: 'string' },
  tickets: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        purchaseDate: {
          type: 'string',
        },
        userID: {
        type: 'string',
        }
      },
    }
  },
};

const lotteryInstanceObject = {
  id_ :{ type: 'string' },
  userID: { type: 'string'},
  guildID: { type: 'string' },
  ticketCost: { type: 'number' },
  minTickets: { type: 'number' },
  maxTickets: { type: 'number' },
  startDate: { type: 'string' },
  endDate: { type: 'string' },
  currentJackpot: { type: 'number' },
  isQueued: { type: 'boolean' },
  isDone: { type: 'boolean' },
  winner: { type: 'string' },
  tickets: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        purchaseDate: {
          type: 'string',
        },
        userID: {
          type: 'string',
        }
      },
    }
  },
  __v: { type: 'number' },
};
