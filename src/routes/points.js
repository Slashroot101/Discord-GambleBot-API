const router = new (require('restify-router')).Router();
const points = require(`../libs/points/points`);
const {responseHandler, errorHandler} = require(`../libs/responseHandler`);
const config = require('../../config');

router.put('/discord-id/:discordID', async function(req, res, next){
    try {
        await points.addPointsByDiscordID(req.params.discordID, req.body.points);
        responseHandler(res, {});
    } catch (err){
        errorHandler(res, err);
    }
    next();
});

router.put('/user-id/:userID', async function(req, res, next){
    try {
        await points.addPointsByUserID(req.params.userID, req.body.points);
        responseHandler(res, {});
    } catch (err){
        errorHandler(res, err);
    }
    next();
});

router.put('/user-id/:userID/daily', async function(req, res, next){
    try {
        let reward = Math.floor(Math.random() * config.daily.max ) + config.daily.min;
        console.log(reward, req.params.userID)
        await points.addPointsByUserID(req.params.userID, reward);
        responseHandler(res, {reward});
    } catch (err){
        console.log(err)
        errorHandler(res, err);
    }
    next();
});

module.exports = router;