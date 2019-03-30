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
      description: 'Successful created a new user',
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

exports.getUserWithFilter = {
  description: 'Gets a user with a filter in query',
  tags: ['User'],
  summary: 'Returns a user with the given filter',
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully got users',
      type: 'object',
      properties: {
        users: {
          type: 'array',
          items: [{
            properties : {
              _id: { type: 'string' },
              discordUserID: { type: 'string' },
              createdOn: { type: 'string' },
              role: { type: 'number' },
              __v: { type: 'number' },
            },
          }]
        }

      }
    }
  }
};
