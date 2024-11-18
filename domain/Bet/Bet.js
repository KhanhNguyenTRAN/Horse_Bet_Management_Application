class Bet {
    constructor(userId, raceId, amount, odds, status) {
        this.userId = userId;
        this. raceId = raceId;
        this.amount = amount;
        this.odds = odds;
        this.status = status;
    }
}

module.exports = Bet;