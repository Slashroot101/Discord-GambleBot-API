const router = new (require('restify-router')).Router();
const Commands = require(`../libs/commands/commands`);
const {responseHandler, errorHandler} = require(`../libs/responseHandler`);

router.get('/name/:commandName', async function (req, res, next) {
    try {
        let commands = await Commands.getByName(req.params.commandName);
        responseHandler(res, {commands})
    } catch (err){
        errorHandler(res, err);
    }
	next();
});

router.post('/', async function (req, res, next) {
    try {
        let command = await Commands.getByName(req.body.name);
        if(command){
            let updatedCommand = await Commands.updateDurationAndUsage(command.id, req.body.duration, req.body.usages);
            responseHandler(res, {commands: updatedCommand});
        } else {
            let newCommand = await Commands.create(req.body.duration, req.body.usages, req.body.name);
            responseHandler(res, {commands: newCommand});
        }
    } catch (err){
        errorHandler(res, err);
    }
	next();
});

router.post('/:commandID/user/:userID', async function(req, res, next){
    try {
        let audit = await Commands.addToUserAudit(req.params.commandID, req.params.userID);
        responseHandler(res, {audit})
    } catch (err){
        errorHandler(res, err);
    }
    next();
});

router.get('/:commandID/user/:userID/cooldown', async function(req, res, next){
    try {
        let audit = await Commands.getCommandHistoryCountByDuration(req.params.commandID, req.params.userID);
        let onCooldown;
        let oldestAudit;
        if(audit !== undefined
            && (Number(audit.executedcommands) === audit.allowedusages
                || Number(audit.executedcommands) > audit.allowedusages)){
             oldestAudit = await Commands.getOldestAuditInDuration(req.params.commandID, req.params.userID);
             oldestAudit.current_time = audit.current_time;
            onCooldown = true;
        } else {
            onCooldown = false;
        }
        responseHandler(res, {onCooldown, oldestAudit});
    } catch (err){
        errorHandler(res, err);
    }
    next();
});



module.exports = router;