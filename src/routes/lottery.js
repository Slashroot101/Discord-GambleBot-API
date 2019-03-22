const router = new (require('restify-router')).Router();
const Lottery = require('../libs/lottery/lottery');
const Points = require('../libs/points/points');
const { responseHandler, errorHandler } = require('../libs/responseHandler');

router.post('/', async (req, res, next) => {
  try {
    if (req.body.lottery.endDate > req.body.lottery.startDate
        || req.body.lottery.startDate === req.body.lottery.endDate) {
      errorHandler(res, new Error('Start date cannot be larger than end date'));
    }
    const newLottery = await Lottery.create(req.body.lottery);
    responseHandler(res, { lottery: newLottery });
  } catch (err) {
    errorHandler(res, err);
  }
  next();
});

router.get('/expired', async (req, res, next) => {
  try {
    const expiredLotteries = await Lottery.getExpiredLotteries();
    responseHandler(res, { lottery: expiredLotteries });
  } catch (err) {
    errorHandler(res, err);
  }
  next();
});

router.get('/:id', async (req, res, next) => {
  try {
    const lottery = await Lottery.getLotteryByID(req.params.id);
    responseHandler(res, { lottery });
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

router.put('/:lotteryID/status', async (req, res, next) => {
  try {
    const lotteryPromises = [];
    req.params.lottery.forEach((element) => {
      lotteryPromises.push(element.lotteryID, element.isDone);
    });
    const updatedLotteries = await Promise.all(lotteryPromises);
    responseHandler(res, { lottery: updatedLotteries });
  } catch (err) {
    errorHandler(res, err);
  }
  next();
});

router.get('/:lotteryID/winner', async (req, res, next) => {
  try {
    const [lotteryWinner, jackpotTotal] = await Promise.all([
      Lottery.pickLotteryWinner(req.params.lotteryID),
      Lottery.getLotteryJackpot(req.params.lotteryID),
      Lottery.setLotteryStatus(req.params.lotteryID, true),
    ]);
    await Lottery.setLotteryStatus(req.params.lotteryID, true);
    await Points.addPointsByUserID(lotteryWinner.user_id, jackpotTotal.jackpot);
    responseHandler(res, { jackpotTotal });
  } catch (err) {
    errorHandler(res, err);
  }
  next();
});

router.get('/guild/:id', async (req, res, next) => {
  try {
    const guildLottery = await Lottery.getLotteryForGuildByDiscordGuildID(req.params.id);
    responseHandler(res, { lottery: guildLottery });
  } catch (err) {
    errorHandler(res, err);
  }
  next();
});

module.exports = router;
