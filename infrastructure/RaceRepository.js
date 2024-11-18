const { connectToDatabase } = require('./Database');
const { ObjectId } = require('mongodb');

class RaceRepository {
    async save(race) {
        const db = await connectToDatabase();
        const result = await db.collection('races').insertOne(race);
        return { ...race, _id: result.insertedId };
    }

    async findById(id) {
        const db = await connectToDatabase();
        return await db.collection('races').findOne({ _id: new ObjectId(id) });
    }

    async findAll() {
        const db = await connectToDatabase();
        return await db.collection('races').find().toArray();
    }
}

module.exports = new RaceRepository();
