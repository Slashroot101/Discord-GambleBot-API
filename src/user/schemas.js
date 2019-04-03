const userObject = {
  _id: { type: 'string' },
  discordUserID: { type: 'string' },
  createdOn: { type: 'string' },
  role: { type: 'string' },
  points: {
    type: 'object',
    properties: {
      currentPoints: { type: 'number' },
      totalAccruedPoints: { type: 'number' },
    },
  },
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
      role: { type: 'string' },
    }
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully created a new user',
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
  querystring: {
    type: 'object',
    properties: {
      ids: {
        type: 'array',
        description: 'Array of user id to filter by',
        items: {
          type: 'string',
        }
      },
      discordUserID: {
        description: 'Discord user ID to filter by',
        type: 'string'
      },
      role: {
        description: 'Role ID to filter by',
        type: 'string'
      },
      createdOn: {
        description: 'Created on date to filter by',
        type: 'string'
      },
    },
  },
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

exports.getUserLeaderboard = {
  description: 'Gets users by points ascending/descending',
  tags: ['User'],
  summary: 'Gets users by points',
  querystring: {
    limit: { type: 'number', minimum: 1 },
    sortOrder: { type: 'number', minimum: -1, maximum: 1 },
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully got users',
      type: 'object',
      properties: {
        users: {
          type: 'array',
          items: {
            properties: userObject,
          }
        }
      }
    }
  }
};
