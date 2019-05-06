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
  createdInChannel: { type: 'string' },
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
  localityType: { type: 'string' }
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
  createdInChannel: { type: 'string' },
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
  localityType: { type: 'string' },
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

exports.getWithFilter = {
  description: 'Gets lotteries with a filter',
  tags: ['Lottery'],
  summary: 'Gets lotteries with the given filter',
  querystring: {
    type: 'object',
    properties: {
      guildID: { type: 'string', description: 'The guild ID that the lottery is active for' },
      startDate: { type: 'string', description: 'The start date to query lotteries for' },
      endDate: { type: 'string', description: 'The end date to query lotteries for' },
      isQueued: { type: 'boolean', description: 'Whether or not the lottery is queued' },
      isDone: { type: 'boolean', description: 'Whether or not the lottery is done' },
      winner: { type: 'string', description: 'Who the lottery winner was' },
      limit: { type: 'number', description: 'The number of lotteries to retrieve' },
      localityType: { type: 'string', description: 'Whether or not the lottery is global' }
    },
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully got the lotteries',
      type: 'object',
      properties: {
        lotteries: {
          type: 'array',
          items: {
            type: 'object',
            properties: lotteryInstanceObject
          },
        }
      },
    }
  }
};

exports.pickAndSetWinner = {
  description: 'Picks and sets a winner for the given lottery',
  tags: ['Lottery'],
  summary: 'Picks and sets a winner randomly for the given lottery',
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    }
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully picked a lottery winner',
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

exports.addTickets = {
  description: 'Add tickets to a lottery',
  tags: ['Lottery'],
  summary: 'Add the given tickets to the lottery',
  body: {
    type: 'object',
    properties: {
      tickets: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            purchaseDate: { type: 'string', description: 'The purchase date of the lottery ticket'},
            userID: { type: 'string', description: 'The user who bought the ticket'}
          }
        }
      },
    },
  },
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', description: 'The ID of the lottery to add the tickets to.' }
    }
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully updated the lottery',
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
