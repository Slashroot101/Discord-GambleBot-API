const router = new (require('restify-router')).Router();
const Commands = require(`../libs/commands/commands`);

router.get('/name/:commandName', async function (req, res, next) {
    let commands = await Commands.getByName(req.params.commandName);
	res.json({
        commands
	});
	next();
});

router.post('/', async function (req, res, next) {
    let command = await Commands.getByName(req.body.name);
    if(command){
        let updatedCommand = await Commands.updateDurationAndUsage(command.id, req.body.duration, req.body.usages);
        res.json({
            commands: updatedCommand
        });  
    } else {
        let newCommand = await Commands.create(req.body.duration, req.body.usages, req.body.name);
        res.json({
            commands: newCommand
        });
    }

	next();
});

module.exports = router;