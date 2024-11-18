const Bet = require('./Bet');
const { ObjectId } = require('mongodb');

class BetService {
    constructor(betRepository, userRepository, raceRepository) {
        this.betRepository = betRepository;
        this.userRepository = userRepository;
        this.raceRepository = raceRepository;
    }

    async placeBet(userId, raceId, amount, odds) {
        const user = await this.userRepository.findById(new ObjectId(userId));
        const race = await this.raceRepository.findById(new ObjectId(raceId));

        if (!user || !race) {
            throw new Error('Invalid user or race');
        }

        if (user.balance < amount) {
            throw new Error('Insufficient balance');
        }

        user.balance -= amount; // Deduct bet amount
        const bet = new Bet(userId, raceId, amount, odds, 'Pending');
        
        await this.userRepository.update(user); // Update user balance
        return await this.betRepository.save(bet);
    }

    async settleBet(betId, outcome) {
        const bet = await this.betRepository.findById(new ObjectId(betId));

        if (!bet) {
            throw new Error('Bet not found');
        }

        bet.status = outcome ? 'Won' : 'Lost';
        if (outcome) {
            const user = await this.userRepository.findById(bet.userId);
            user.balance += bet.amount * bet.odds; // Payout
            await this.userRepository.update(user);
        }

        return await this.betRepository.update(bet);
    }
}

module.exports = BetService;
