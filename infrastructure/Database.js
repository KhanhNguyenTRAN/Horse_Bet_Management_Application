const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
let client;
let db;

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db();
    }
    return db;
}

module.exports = { connectToDatabase };
