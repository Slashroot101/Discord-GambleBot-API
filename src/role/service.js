const { boomify } = require('boom');
const Role = require('./RoleModel');

exports.createRole = async (req, resp) => {
  try {
    const role = await new Role(req.body).save();
    return {role};
  } catch (err) {
    throw boomify(err);
  }
};

exports.updateRole = async (req, resp) => {
  try {
    const role = await Role
        .findOneAndUpdate(
            { _id: req.params._id },
            { $set: req.body },
            { new:true }
        ).exec();
    return {role};
  } catch (err) {
    throw boomify(err);
  }
};

exports.getRoleWithFilter = async (req, resp) => {
  try {
    const query = {};

    if(req.query['ids[]']){
      query._id = { $in: req.query['ids[]']};
    }

    if(req.query.name){
      query.name = req.query.name;
    }

    if('hasAdmin' in req.query){
      query.hasAdmin = req.query.hasAdmin;
    }

    if('isSuperUser' in req.query){
      query.isSuperUser = req.query.isSuperUser;
    }

    const roles = await Role.find(query).limit(Number(req.query.limit)).exec();
    return {roles};
  } catch (err) {
    throw boomify(err);
  }
};
