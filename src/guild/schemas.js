const guildObject = {
  _id: { type: 'string' },
  discordGuildID: { type: 'string', },
  bank: {
    type: 'object',
    properties: {
      currentBalance: { type: 'number', },
      totalPointsGained: { type: 'number', }
    }
  },
  isGlobal: { type: 'boolean'},
  createdOn: { type: 'string', },
  settings: {
    type: 'array',
    items: {
      type: ['string', 'boolean', 'object'],
    }
  },
  disabledCommands: {type: 'array', items: {type: 'string'}},
  communicationChannel: {
    type: 'object',
    properties: {
      discordChannelID: { type: 'string', },
    }
  },
  prefix: { type: 'string' },
  __v: { type: 'number' },
};

const guildWithoutInstanceVariables = {
  discordGuildID: { type: 'string', },
  disabledCommands: {type: 'array', items: {type: 'string'}},
  bank: {
    type: 'object',
    properties: {
      currentBalance: { type: 'number', },
      totalPointsGained: { type: 'number', }
    }
  },
  prefix: { type: 'string' },
  isGlobal: { type: 'boolean'},
  createdOn: { type: 'string', },
  communicationChannel: {
    type: 'object',
    properties: {
      discordChannelID: { type: 'string', },
    }
  },
};

exports.getGuildLeaderboard = {
  description: 'Gets guilds by points ascending/descending',
  tags: ['Guild'],
  summary: 'Gets guilds by points',
  querystring: {
    numPages: { type: 'number', minimum: 1, description: 'Number of pages to return'},
    sortOrder: { type: 'number', minimum: -1, maximum: 1, description: 'Order to sort the leaderboard by', },
    pageSize: { type: 'number', description: 'Page size to return by', },
    pageStart: { type: 'number', description: 'Row number for paging to start at'}
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully got guilds',
      type: 'object',
      properties: {
        guilds: {
          type: 'array',
          items: {
            properties: guildObject,
          }
        }
      }
    }
  }
};


exports.createGuild = {
  description: 'Create a new guild with the given values',
  tags: ['Guild'],
  summary: 'Creates a new guild with the given values',
  body: {
    type: 'object',
    properties: guildWithoutInstanceVariables
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully created guild',
      type: 'object',
      properties: {
        guild: {
          type: 'object',
          properties: guildObject,
        }
      },
    }
  }
};

exports.getGuildWithFilter = {
  description: 'Gets guilds with the given filters',
  tags: ['Guild'],
  summary: 'Retrieves documents with the given filter',
  querystring: {
    type: 'object',
    properties: {
      discordGuildID: { type: 'array',  description: 'The Discord ID of the guild'},
      createdOn: { type: 'string', description: 'The date the guild was added to the database'},
      isGlobal: { type: 'boolean', description: 'If the guild is global or not (there is only one global guild)'},
      limit: { type: 'number', description: 'Then number of documents to retrieve'},
      discordChannelID: { type: 'string', description: 'The communication channel set for a guild'},
      id: { type: 'string', description: 'The row ID of the guild to retrieve'},
      disabledCommands: { type: 'array', description: 'The guilds with the given disabled commands'},
      enabledCommands: { type: 'array', description: 'All of the guilds that do not have the command(s) disabled'},
    },
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully retrieved guild(s)',
      type: 'object',
      properties: {
        guilds:{
          type: 'array',
          items: {
            type: 'object',
            properties: guildObject,
          },
        }
      },
    }
  }
};

exports.deleteGuild = {
  description: 'Deletes a guild by ID.',
  tags: ['Guild'],
  summary: 'Deletes a guild by ID',
  exposeRoute: true,
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Successfully deleted the guild',
      type: 'object',
      properties: {
        guild: {
          type: 'object',
          properties: guildObject,
        }
      }
    },
    404: {
      description: 'Guild could not be found to be deleted',
      type: 'object',
      properties: {
        code: { type: 'number' },
        message: { type: 'string' }
      }
    }
  }
};

exports.updateGuild = {
  description: 'Updates a guild by ID with the given values.',
  tags: ['Guild'],
  summary: 'Updates a guild',
  exposeRoute: true,
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
  },
  body: {
    type: 'object',
    properties: {
      points: { type: 'number'},
      enabledCommands: { type: 'array', items: {type:'string'} },
      discordChannelID: { type: 'string' },
      disabledCommands: { type: 'array', items: {type:'string'} },
      prefix: { type: 'string' },
    }
  },
  response: {
    200: {
      description: 'Successfully updated the guild',
      type: 'object',
      properties: {
        guild: {
          type: 'object',
          properties: guildObject,
        }
      }
    },
  }
};
