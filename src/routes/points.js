const router = new (require('restify-router')).Router();
const Points = require('../libs/points/points');
const Guild = require('../libs/guild/guild');
const { responseHandler, errorHandler } = require('../libs/responseHandler');
const config = require('../../config');

router.post('/command-history/:executionID/point/:points', async (req, res, next) => {
  try {
    const audit = await Points.addPointsToUserAudit(req.params.executionID, req.params.points);
    responseHandler(res, { audit });
  } catch (err) {
    errorHandler(res, err);
  }
  next();
});

router.put('/user-id/:userID', async (req, res, next) => {
  try {
    let guildTaxPoints = 0;
    if (req.body.points > 0) {
      guildTaxPoints = req.body.points * config.taxes.guild;
      await Guild.addPointsToGuildBank(req.body.guildID, guildTaxPoints);
    }
    console.log(req.body.points, guildTaxPoints, req.body.points - guildTaxPoints)
    await Points.addPointsByUserID(req.params.userID, (req.body.points - guildTaxPoints));
    responseHandler(res, {});
  } catch (err) {
    errorHandler(res, err);
  }
  next();
});

router.put('/user-id/:userID/daily', async (req, res, next) => {
  try {
    const reward = Math.floor(Math.random() * config.daily.max) + config.daily.min;
    await Points.addPointsByUserID(req.params.userID, reward);
    responseHandler(res, { reward });
  } catch (err) {
    errorHandler(res, err);
  }
  next();
});

router.get('/page-number/:pageNumber/leaderboard', async (req, res, next) => {
  try {
    const leaderboardData = await Points.getLeaderboardByPageNumber(req.params.pageNumber);
    const numRows = await Points.getNumberOfRows();
    const numPages = Math.ceil(numRows / 10);
    responseHandler(res, { leaderboard: leaderboardData, numPages });
  } catch (err) {
    errorHandler(res, err);
  }
  next();
});

router.get('/user-id/:userID/command-id/:commandID/net', async (req, res, next) => {
  try {
    const netPoints = await Points.getNetCommandPoints(req.params.commandID, req.params.userID);
    responseHandler(res, { netPoints });
  } catch (err) {
    errorHandler(res, err);
  }
  next();
});

module.exports = router;
