const router = new (require('restify-router')).Router();
const Lottery = require('../libs/lottery/lottery');
const { responseHandler, errorHandler } = require('../libs/responseHandler');

router.post('/', async (req, res, next) => {
  try {
    const newLottery = await Lottery.create(req.body.lottery);
    responseHandler(res, { lottery: newLottery });
  } catch (err) {
    errorHandler(res, err);
  }
  next();
});

router.get('/user/:userID/active', async (req, res, next) => {
  try {
    const activeLotteries = await Lottery.getActiveLotteryForUserByUserID(req.params.userID);
    responseHandler(res, { lottery: activeLotteries });
  } catch (err) {
    errorHandler(res, err);
  }
  next();
});

router.put('/:lotteryID/status', async(req, res, next) => {
  try {
    const updatedLottery = await Lottery.setLotteryStatus(req.params.lotteryID, req.params.isDone);
    responseHandler(res, { lottery: updatedLottery });
  } catch (err) {
    errorHandler(res, err);
  }
  next();
});

router.get('/:lotteryID/winner', async (req, res, next) => {
  try {
  } catch (err){
    errorHandler(res, err);
  }
  next();
});

module.exports = router;
