const roleObject = new mongoose.Schema({
  name: {
    type: 'string',
  },
  isSuperUser: {
    type: 'boolean',
  },
  hasAdmin: {
    type: 'boolean',
  }
});

exports.createRole = {
  description: 'Create a role',
  tags: ['Role'],
  summary: 'Creates a new role with the given values',
  body: {
    type: 'object',
    properties: {
      name: req.body.name,
      isSuperUser: req.body.isSuperUser,
      hasAdmin: req.body.hasAdmin,
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
