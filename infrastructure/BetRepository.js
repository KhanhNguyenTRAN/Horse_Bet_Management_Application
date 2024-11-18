const { connectToDatabase } = require('./Database');
const { ObjectId } = require('mongodb');

class BetRepository {
    async save(bet) {
        const db = await connectToDatabase();
        const result = await db.collection('bets').insertOne(bet);
        return { ...bet, _id: result.insertedId };
    }

    async findById(id) {
        const db = await connectToDatabase();
        return await db.collection('bets').findOne({ _id: new ObjectId(id) });
    }

    async update(bet) {
        const db = await connectToDatabase();
        await db.collection('bets').updateOne({ _id: new ObjectId(bet._id) }, { $set: { status: bet.status } });
        return await this.findById(bet._id);
    }

    async findAll() {
        const db = await connectToDatabase();
        return await db.collection('bets').find().toArray();
    }
}

module.exports = new BetRepository();
