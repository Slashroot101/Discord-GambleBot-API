const router = new (require('restify-router')).Router();
const User = require(`../libs/user/users`);
const points = require(`../libs/points/points`);
const {responseHandler, errorHandler} = require(`../libs/responseHandler`);

router.get('/discord-id/:discordID', async function (req, res, next) {
    try {
        let discordUser = await User.getByDiscordID(req.params.discordID);
        responseHandler(res, discordUser.rows);
    } catch (err){
        errorHandler(res, err);
    }
    next();
});

router.post('/', async function(req, res, next){
    try {
        let discordUser = await User.create(req.body.discordID);
        await points.create(discordUser.rows[0].id);
        responseHandler(res, discordUser.rows);
    } catch (err){
        errorHandler(res, err);
    }
    next();
});

router.get('/user-id/:userID/blacklist', async function(req, res, next){
    try {
        let blacklistUser = await User.isBlacklisted(req.params.userID);
        responseHandler(res, {blacklistUser});
    } catch (err) {
        errorHandler(res, err);
    }
    next();
});

router.post('/user-id/:userID/blacklist', async function(req, res, next){
    try {
        let blacklistUser = await User.blacklist(req.params.userID, req.body.userWhoBanned, req.body.reason, new Date());
        responseHandler(res, {blacklistUser})
    } catch (err) {
        errorHandler(res, err);
    }
    next();
});

module.exports = router;