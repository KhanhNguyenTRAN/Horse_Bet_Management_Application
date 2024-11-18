const express = require('express');
const router = express.Router();
const BetService = require('../domain/Bet/BetService');
const betRepository = require('../infrastructure/BetRepository');
const userRepository = require('../infrastructure/UserRepository');
const raceRepository = require('../infrastructure/RaceRepository');

const betService = new BetService(betRepository, userRepository, raceRepository);

router.post('/bets', async (req, res) => {
    try {
        const bet = await betService.placeBet(req.body.userId, req.body.raceId, req.body.amount, req.body.odds);
        res.status(201).json(bet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.post('/bets/:betId/settle', async (req, res) => {
    const { betId } = req.params;
    const { outcome } = req.body;

    try {
        const settledBet = await betService.settleBet(betId, outcome);
        res.status(200).json(settledBet);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
