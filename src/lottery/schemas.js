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
  _id :{ type: 'string' },
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

exports.createLottery = {
  description: 'Create a new lottery',
  tags: ['Lottery'],
  summary: 'Creates a new lottery with given values',
  body: {
    type: 'object',
    properties: lotteryObject,
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully created a new lottery',
      type: 'object',
      properties: {
        lottery: {
          type: 'object',
          properties: lotteryInstanceObject,
        }
      },
    }
  }
};

exports.updateLottery = {
  description: 'Update a lottery',
  tags: ['Lottery'],
  summary: 'Update a lottery with given values',
  body: {
    type: 'object',
    properties: {
      tickets: { type: 'array', items: {
        type: 'object',
          properties: { "purchaseDate": { type: 'string' }, "userID": { type: 'string' } }
        }, description: 'Tickets to add to lottery'},
      isDone: { type: 'boolean', description: 'Whether the lottery is done or not' },
      isQueued: { type: 'boolean', description: 'Whether the lottery has been queued' },
      winner: { type: 'string', description: 'Who the lottery winner is' },
    },
  },
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    }
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully updated a lottery',
      type: 'object',
      properties: {
        lottery: {
          type: 'object',
          properties: lotteryInstanceObject,
        }
      },
    }
  }
};
