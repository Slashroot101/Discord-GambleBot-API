const { boomify } = require('boom');
const Role = require('./RoleModel');

exports.createRole = async  (req, resp) => {
  try {
    const role = new Role(req.body);
    return role.save();
  } catch (err) {
    throw boomify(err);
  }
};