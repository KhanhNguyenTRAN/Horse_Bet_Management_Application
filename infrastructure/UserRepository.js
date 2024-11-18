const { connectToDatabase } = require('./Database');
const { ObjectId } = require('mongodb');

class UserRepository {
    async findByEmail(email) {
        const db = await connectToDatabase();
        return await db.collection('users').findOne({ email });
    }

    async save(user) {
        const db = await connectToDatabase();
        const result = await db.collection('users').insertOne(user);
        return { ...user, _id: result.insertedId };        
    }

    async findById(id) {
        const db = await connectToDatabase();
        return await db.collection('users').findOne({ _id: new ObjectId(id) });
    }

    async update(user) {
        const db = await connectToDatabase();
        await db.collection('users').updateOne({ _id: new ObjectId(user._id) }, { $set: { balance: user.balance } });
        return await this.findById(user._id);
    }

    async findAll() {
        const db = await connectToDatabase();
        return await db.collection('users').find().toArray();
    }
}

module.exports = new UserRepository();
