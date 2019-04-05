const commandHistoryObject = {
  _id: { type: 'string' },
  commandID: { type: 'string' },
  executionTime: { type: 'string' },
  userID: { type: 'string' },
  points: { type: 'number' },
  __v: { type: 'number' },
};

exports.createCommandHistory = {
  description: 'Create a new command history audit',
  tags: ['CommandHistory'],
  summary: 'Creates a new command history audit with the given values',
  body: {
    type: 'object',
    properties: {
      commandID: { type: 'string' },
      executionTime: { type: 'string' },
      userID: { type: 'string' },
      points: { type: 'number' },
    }
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully created a command history audit',
      type: 'object',
      properties: {
        commandHistory: {
          type: 'object',
          properties: commandHistoryObject,
        }
      },
    }
  }
};

exports.getWithFilter = {
  description: 'Get the command audit history with a filter',
  tags: ['CommandHistory'],
  summary: 'Retrieves the command audit history with the given filter',
  querystring: {
    type: 'object',
    properties: {
      userID: {
        type: 'string',
        description: 'The userID for which to get the documents for',
      },
      startTime: {
        type: 'string',
        description: 'The start date to start find documents greater than as an ISO string',
      },
      endTime: {
        type: 'string',
        description: 'The end time to start to filter documents out greater than as an ISO string',
      }
    },
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully retrieved the command audit history with the given filter',
      type: 'object',
      properties: {
        commandHistory: {
          type: 'array',
          items: {
            type: 'object',
            properties: commandHistoryObject,
          }
        }
      },
    }
  }
};