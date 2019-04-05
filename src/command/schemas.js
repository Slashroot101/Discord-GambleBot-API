const commandObject = {
  _id: { type: 'string' },
  name: { type: 'string' },
  description: { type: 'string' },
  costData: {
    type: 'object',
    properties: {
      cost: { type: 'number' },
      hasCost: { type: 'boolean' },
    },
  },
  allowedRoles: {
    type: 'array',
    items: {
      type: 'string',
    },
  },
  cooldown: {
    type: 'object',
    properties: {
      hasCooldown: { type: 'boolean' },
      executionPerMinute: { type: 'number' },
      cooldownInMinutes: { type: 'number' },
    }
  },
  __v: { type:  'number' },
};


exports.createCommand = {
  description: 'Create a command',
  tags: ['Command'],
  summary: 'Creates a new command with the given values',
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      costData: {
        type:'object',
        properties: {
          cost: { type: 'number' },
          hasCost: { type: 'boolean'}
        }
      },
      allowedRoles: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      cooldown: {
        type: 'object',
        properties: {
          hasCooldown: { type: 'number' },
          executionPerMinute: { type: 'number' },
          cooldownInMinutes: { type: 'number' },
        }
      }
    }
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully created a new command',
      type: 'object',
      properties: {
        command: {
          type: 'object',
          properties: commandObject
        }
      },
    }
  }
};

exports.getCommandWithFilter = {
  description: 'Get commands with a filter',
  tags: ['Command'],
  summary: 'Gets commands with the given filter',
  querystring: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Name of command to filter by'
      },
      ids: {
        type: 'string',
        description: 'Command IDS to filter by',
      },
      limit: {
        type: 'number',
        description: 'The number of documents to retrieve',
      }
    },
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully got commands',
      type: 'object',
      properties: {
        commands: {
          type: 'array',
          items: {
            properties: commandObject,
          }
        },
      },
    }
  }
};

exports.updateCommand = {
  description: 'Update a command',
  tags: ['Command'],
  summary: 'Update a command with the given values',
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      costData: {
        type: 'object',
        properties: {
          cost: { type: 'number' },
          hasCost: { type: 'boolean' },
        },
      },
      allowedRoles: {
        type: 'array',
        items: {
          type: 'string',
        }
      },
      cooldown: {
        type: 'object',
        properties: {
          hasCooldown: { type: 'boolean' },
          executionPerMinute: { type: 'number' },
          cooldownInMinutes: { type: 'number' },
        }
      },
    },
  },
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    },
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully updated a command',
      type: 'object',
      properties: {
        command: {
          type: 'object',
          properties: commandObject,
        },
      },
    }
  }
};

exports.deleteCommand = {
  description: 'Deletes a command by ID.',
  tags: ['Command'],
  summary: 'Deletes a command by ID.',
  exposeRoute: true,
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Successfully deleted command',
      type: 'object',
      properties: {
        command: {
          type: 'object',
          properties: commandObject,
        }
      }
    },
    404: {
      description: 'Command could not be found to be deleted',
      type: 'object',
      properties: {
        code: { type: 'number' },
        message: { type: 'string' }
      }
    }
  }
};
