const router = new (require('restify-router')).Router();
const Guild = require(`../libs/guild/guild`);
const {responseHandler, errorHandler} = require(`../libs/responseHandler`);

router.post('/:guildID', async function(req, res, next){
    try {
        let guild = await Guild.create(req.params.guildID);
        responseHandler(res, {guild});
    } catch (err){
        errorHandler(res, err);
    }
    next();
});

module.exports = router;