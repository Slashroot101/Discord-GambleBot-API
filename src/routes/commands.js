const router = new (require('restify-router')).Router();
const Commands = require(`../libs/commands/commands`);
const {responseHandler, errorHandler} = require(`../libs/responseHandler`);

router.get('/name/:commandName', async function (req, res, next) {
    let commands = await Commands.getByName(req.params.commandName);
    responseHandler(res, {commands})
	next();
});

router.post('/', async function (req, res, next) {
    let command = await Commands.getByName(req.body.name);
    if(command){
        let updatedCommand = await Commands.updateDurationAndUsage(command.id, req.body.duration, req.body.usages);
        responseHandler(res, {commands: updatedCommand}); 
    } else {
        let newCommand = await Commands.create(req.body.duration, req.body.usages, req.body.name);
        responseHandler(res, {commands: newCommand});
    }
	next();
});

router.post('/:commandID/user/:userID', async function(req, res, next){
    console.log(req.params.commandID, req.params.userID)
    let audit = await Commands.addToUserAudit(req.params.commandID, req.params.userID, new Date());
    responseHandler(res, {audit})
    next();
});

module.exports = router;