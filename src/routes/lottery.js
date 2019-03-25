const router = new (require('restify-router')).Router();
const Lottery = require('../libs/lottery/lottery');
const Points = require('../libs/points/points');
const { getByID } = require('../libs/guild/guild');
const { responseHandler, errorHandler } = require('../libs/responseHandler');
const { getForGuildID } = require('../libs/channels/channels');
const { getByID: getUserByID } = require('../libs/user/users');

router.put('/queue/status', async (req, res, next) => {
  try {
    const lotteryStatusUpdatePromises = [];
    req.body.lotteryIds.forEach((element) => {
      lotteryStatusUpdatePromises.push(Lottery.setConsumedByQueue(element));
    });
    await Promise.all(lotteryStatusUpdatePromises);
    responseHandler(res, { success: true });
  } catch (err) {
    errorHandler(res, err);
  }
  next();
});

router.post('/', async (req, res, next) => {
  try {
    const overlapLottery = await Lottery.findPossibleOverlap(
      req.body.lottery.duration,
      req.body.lottery.guildID,
    );

    if (overlapLottery.length !== 0) {
      responseHandler(res, { lottery: {} });
    } else {
      const newLottery = await Lottery.create(req.body.lottery);
      responseHandler(res, { lottery: newLottery });
    }
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

router.post('/:lotteryID/winner', async (req, res, next) => {
  try {
    const [lotteryWinner, jackpotTotal] = await Promise.all([
      Lottery.pickLotteryWinner(req.params.lotteryID),
      Lottery.getLotteryJackpot(req.params.lotteryID),
      Lottery.setLotteryStatus(req.params.lotteryID, true),
    ]);

    if (lotteryWinner.user_id) {
      await Promise.all([
        Lottery.setLotteryStatus(req.params.lotteryID, true),
        Points.addPointsByUserID(lotteryWinner.user_id, jackpotTotal.jackpot),
        Lottery.setWinner(req.params.lotteryID, lotteryWinner.user_id),
      ]);
    }

    const [guild, channel, user] = await Promise.all([
      getByID(lotteryWinner.guild_id),
      getForGuildID(lotteryWinner.guild_id),
      getUserByID(lotteryWinner.user_id),
    ]);

    responseHandler(res, {
      jackpotTotal,
      lotteryWinner,
      guild,
      channel,
      user,
    });
  } catch (err) {
    errorHandler(res, err);
  }
  next();
});

router.get('/discord-guild/:id', async (req, res, next) => {
  try {
    const guildLottery = await Lottery.getLotteryForGuildByDiscordGuildID(req.params.id);
    responseHandler(res, { lottery: guildLottery });
  } catch (err) {
    errorHandler(res, err);
  }
  next();
});


module.exports = router;
