const { boomify } = require('boom');
const Guild = require('./GuildModel');

exports.createGuild = async (req, reply) => {
  try {
    const guild = await new Guild(req.body).save();
    return {guild};
  } catch (err) {
    throw boomify(err);
  }
};

exports.getWithFilter = async (req, reply) => {
  try {
    const query = {};

    if(req.query['discordGuildID[0]']){
      const discordGuildIDs = [];
      for(let key in req.query){
       if(key.includes('discordGuildID')){
         discordGuildIDs.push(req.query[`${key}`]);
       }
      }
     console.log(discordGuildIDs)
      query.discordGuildID = { $in: discordGuildIDs};
    }

    if(req.query.createdOn){
      query.createdOn = req.query.createdOn;
    }

    if('isGlobal' in req.query){
      query.isGlobal = req.query.isGlobal;
    }

    const guilds = await Guild.find(query).limit(req.query.limit).exec();
    return {guilds}
  } catch (err) {
    throw boomify(err);
  }
};

exports.getGuildLeaderboard = async(req, reply) => {
  try {
    const guilds = await Guild
        .find()
        .sort({"bank.currentBalance" : req.query.sortOrder})
        .skip(req.query.pageStart)
        .limit(req.query.pageSize * req.query.numPages)
        .exec();
    return {guilds};
  } catch (err) {
    throw boomify(err);
  }
};

exports.updateGuild = async (req, reply) => {
  console.log(req.body)
  if(Object.keys(req.body).length === 0){
    return {guild: {}};
  }
  const query = {};
  if(req.body.points) {
    query['$inc'] = {
      "bank.currentBalance" : req.body.points,
    };

    if(req.body.points > 0){
      query['$inc']['bank.totalPointsGained'] = req.body.points;
    }
  }

  if(req.body.disabledCommands){
    query.disabledCommands = req.body.disabledCommands;
  }

  if(req.body.prefix){
    query.prefix = req.body.prefix;
  }

  if('onlyAllowCommunicationsHere' in req.body) {
    query["communicationChannel.onlyAllowCommunicationsHere"] = req.body.onlyAllowCommunicationsHere;
  }

  if(req.body.discordChannelID){
    query["communicationChannel.discordChannelID"] = req.body.discordChannelID;
  }

  try {
    const guild = await Guild.findOneAndUpdate(
        {
          _id: req.params.id
        },
        {$set: query},
        {new: true, upsert: true},
    ).exec();
    const returnValue = guild !== null ? guild : {};
    return {guild: returnValue};
  } catch (err) {
    throw boomify(err);
  }
};

exports.deleteGuild = async (req, reply) => {
  try {
    const guild =  await Guild.findByIdAndDelete(req.params.id).exec();
    if(guild !== null){
      return {guild}
    } else {
      return reply
          .code(404)
          .send({
            message: 'Guild could not be found.',
            code: 404,
          });
    }
  } catch (err) {
    throw boomify(err);
  }
};
