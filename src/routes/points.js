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
        responseHandler(res, {leaderboard: leaderboardData})
    } catch (err){
        errorHandler(res, err);
    }
    next();
});

module.exports = router;