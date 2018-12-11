const router = new (require('restify-router')).Router();
const user = require(`../libs/users`);
const {responseHandler, errorHandler} = require(`../libs/responseHandler`);

router.get('/discord-id/:discordID', async function (req, res, next) {
    try {
        let discordUser = await user.getByDiscordID(req.params.discordID);
        responseHandler(res, discordUser.rows);
    } catch (err){
        errorHandler(res, err);
    }
    next();
});

router.post('/', async function(req, res, next){
    try {
        let discordUser = await user.create(req.body.discordID);
        responseHandler(res, discordUser.rows);
    } catch (err){

    }

});

module.exports = router;