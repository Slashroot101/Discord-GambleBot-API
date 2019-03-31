const userObject = {
  _id: { type: 'string' },
  discordUserID: { type: 'string' },
  createdOn: { type: 'string' },
  role: { type: 'number' },
  __v: { type: 'number' },
};

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
      properties: userObject,
    }
  }
};

exports.deleteUser = {
  description: 'Deletes a user by ID.',
  tags: ['User'],
  summary: 'Deletes a user by ID',
  exposeRoute: true,
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Successfully deleted user',
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: userObject,
        }
      }
    },
    404: {
      description: 'User could not be found to be deleted',
      type: 'object',
      properties: {
        code: { type: 'number' },
        message: { type: 'string' }
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
          items: {
            properties : userObject,
          }
        }
      }
    }
  }
};
