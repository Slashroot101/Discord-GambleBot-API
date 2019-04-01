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
    }
  },
  cooldown: {
    type: 'object',
    properties: {
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
          cost: { type: 'string' },
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
          executionPerMinute: 'number',
          cooldownInMinutes: 'number',
        }
      }
    }
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully created a new user',
      type: 'object',
      properties: commandObject,
    }
  }
};

