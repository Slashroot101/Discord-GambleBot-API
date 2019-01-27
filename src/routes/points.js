const router = new (require('restify-router')).Router();
const Points = require(`../libs/points/points`);
const {responseHandler, errorHandler} = require(`../libs/responseHandler`);
const config = require('../../config');

router.put('/discord-id/:discordID', async function(req, res, next){
    try {
        await Points.addPointsByDiscordID(req.params.discordID, req.body.points);
        responseHandler(res, {});
    } catch (err){
        errorHandler(res, err);
    }
    next();
});

router.post('/command-history/:executionID/point/:points', async function(req, res, next){
    try {
        const audit = await Points.addPointsToUserAudit(req.params.executionID, req.params.points);
        responseHandler(res, {audit});
    } catch (err) {
        errorHandler(res, err);
    }
    next();
});

router.put('/user-id/:userID', async function(req, res, next){
    try {
        await Points.addPointsByUserID(req.params.userID, req.body.points);
        responseHandler(res, {});
    } catch (err){
        errorHandler(res, err);
    }
    next();
});

router.put('/user-id/:userID/daily', async function(req, res, next){
    try {
        let reward = Math.floor(Math.random() * config.daily.max ) + config.daily.min;
        await Points.addPointsByUserID(req.params.userID, reward);
        responseHandler(res, {reward});
    } catch (err){
        errorHandler(res, err);
    }
    next();
});

router.get('/page-number/:pageNumber/leaderboard', async function(req, res, next){
    try {
        let leaderboardData = await Points.getLeaderboardByPageNumber(req.params.pageNumber);
        let numRows = await Points.getNumberOfRows();
        let numPages = Math.ceil(numRows / 10);
        responseHandler(res, {leaderboard: leaderboardData, numPages})
    } catch (err){
        errorHandler(res, err);
    }
    next();
});

router.get('/user-id/:userID/command-id/:commandID/net', async function(req, res, next){
    try {
        let netPoints = await Points.getNetCommandPoints(req.params.commandID, req.params.userID);
        responseHandler(res, {netPoints});
    } catch (err){
        errorHandler(res, err);
    }
    next();
});

module.exports = router;