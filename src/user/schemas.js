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
  blacklist: {
    type: 'object',
    properties: {
      date: {
        type: 'string',
      },
      isBlacklisted: {
        type: 'boolean',
      }
    },
  },
  commandExecutionMetaData: {
    type: 'array',
    items: {
      type:  'object',
      properties: {
        commandID: { type: 'string' },
        netPoints: { type: 'number' },
        numExecutions: { type: 'number'},
      }
    }
  },
  __v: { type: 'number' },
};

exports.addPointsToUser = {
  description: 'Updates a user\'s points',
  tags: ['User'],
  summary: 'Updates user\'s points',
  body: {
    type: 'object',
    properties: {
      points: { type: 'number', description: 'The number of points to add to the user' },
    }
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully added points to user',
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: userObject,
        }
      },
    }
  }
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
      properties: {
        user: {
          type: 'object',
          properties: userObject,
        }
      },
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
      isBlacklisted: {
        description: 'Whether or not the user is blacklisted',
        type: 'boolean',
      },
      limit: {
        description: 'The number of rows to retrieve',
        type: 'number',
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
    numPages: { type: 'number', minimum: 1, description: 'Number of pages to return'},
    sortOrder: { type: 'number', minimum: -1, maximum: 1, description: 'Order to sort the leaderboard by', },
    pageSize: { type: 'number', description: 'Page size to return by', },
    pageStart: { type: 'number', description: 'Row number for paging to start at'}
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
