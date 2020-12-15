const db = require('mongoose');

db.Promise = global.Promise; // implement promise for return database

async function connect() {
    await db.connect(process.env.NODE_ENV === 'test' ? process.env.MONGODB_URL_TEST : process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    console.log(`[db] DB ${process.env.NODE_ENV === 'test'?'test':'production'} is connected`);
}

async function close() {
    if (process.env.NODE_ENV === 'test') {
        const collections = await db.connection.db.collections();
        for (let collection of collections) {
            await collection.drop();
        }
    }
    return await db.connection.close();
}

module.exports = { connect, close };