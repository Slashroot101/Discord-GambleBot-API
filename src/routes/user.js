const router = new (require('restify-router')).Router();
const user = require(`../libs/users`);

router.get('/:discordID', async function (req, res, next) {
    let discordUser = await user.getByDiscordID(req.params.discordID);
    console.log(discordUser.rows)
    res.json({discordUser});
	next();
});

module.exports = router;