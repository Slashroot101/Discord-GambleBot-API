exports.createUser = {
  description: 'Create a new discord user',
  tags: ['User'],
  summary: 'Creates a new user with given values',
  body: {
    type: 'object',
    properties: {
      discordUserID: { type: 'string' },
      role: { type: 'number' },
    }
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        _id: { type: 'string' },
        discordUserID: { type: 'string' },
        createdOn: { type: 'string' },
        role: { type: 'number' },
        __v: { type: 'number' },
      }
    }
  }
};
