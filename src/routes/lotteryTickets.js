const router = new (require('restify-router')).Router();
const { responseHandler, errorHandler } = require('../libs/responseHandler');
const LotteryTicket = require('../libs/lotteryTickets/lotteryTickets');

router.post('/', async (req, res, next) => {
  try {
    const createdPromises = [];
    for (let i = 0; i < req.body.numTickets; i += 1) {
      createdPromises.push(LotteryTicket.create(
        req.body.userID,
        req.body.lotteryID,
      ));
    }
    const lotteryTickets = await Promise.all(createdPromises);
    responseHandler(res, { lotteryTickets });
  } catch (err) {
    errorHandler(res, err);
  }
  next();
});

router.get('/lottery/:lotteryID/user/:userID/tickets', async (req, res, next) => {
  try {
    const tickets = await LotteryTicket.getForUser(req.params.userID, req.params.lotteryID);
    responseHandler(res, { tickets });
  } catch (err) {
    errorHandler(res, err);
  }
  next();
});

router.get('/lottery/:id/numTickets', async (req, res, next) => {
  try {
    const numTickets = await LotteryTicket.getNumberOfTotalTickets(req.params.id);
    responseHandler(res, {numTickets});
  } catch (err){
    errorHandler(res, err);
  }
  next();
});

module.exports = router;
