const router = new (require('restify-router')).Router();
const {create} = require(`../libs/points/points`);
const {responseHandler, errorHandler} = require(`../libs/responseHandler`);


module.exports = router;