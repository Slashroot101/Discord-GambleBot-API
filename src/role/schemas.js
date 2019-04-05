const roleObject = {
  _id: {
    type: 'string',
  },
  name: {
    type: 'string',
  },
  isSuperUser: {
    type: 'boolean',
  },
  hasAdmin: {
    type: 'boolean',
  },
  __v: {
   type: 'number',
  }
};

exports.updateRole = {
  description: 'Updates a role',
  tags: ['Role'],
  summary: 'Updates the role with the given values',
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      isSuperUser: {
        type: 'boolean',
      },
      hasAdmin: {
        type: 'boolean',
      },
    },
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully updated the role',
      type: 'object',
      properties: {
        role: {
          type: 'object',
          properties: roleObject
        }
      },
    }
  }
};



exports.createRole = {
  description: 'Create a role',
  tags: ['Role'],
  summary: 'Creates a new role with the given values',
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      isSuperUser: { type: 'boolean' },
      hasAdmin: { type: 'boolean' },
    }
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully created a new user',
      type: 'object',
      properties: {
        role: {
          type: 'object',
          properties: roleObject
        }
      },
    }
  }
};

exports.getRoleWithFilter = {
  description: 'Get all roles with a filter',
  tags: ['Role'],
  summary: 'Retrieves all roles with the given filter',
  querystring: {
    ids: { type: 'array', description: 'Filter by the given IDs' },
    name: { type: 'string', description: 'Filter by role name' },
    hasAdmin: { type: 'boolean', description: 'Filter by hasAdmin' },
    isSuperUser: { type: 'boolean', description: 'Filter by isSuperUser' },
    limit: { type: 'number', description: 'Number of rows to limit' },
  },
  exposeRoute: true,
  response: {
    200: {
      description: 'Successfully got roles with the given filter',
      type: 'object',
      properties: {
        roles: {
          type: 'array',
          items: {
            type: 'object',
            properties: roleObject,
          }
        }
      },
    }
  }
};
