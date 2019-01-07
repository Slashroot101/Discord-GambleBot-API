const router = new (require('restify-router')).Router();
const points = require(`../libs/points/points`);
const {responseHandler, errorHandler} = require(`../libs/responseHandler`);

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

module.exports = router;