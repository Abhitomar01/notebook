const mongoose = require('mongoose');

async function connectToMongo() {
    try {
        await mongoose.connect('mongodb://localhost:27017/firstdatabse')
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Connection error:', err);
        process.exit(1);
    }
}

module.exports = connectToMongo;
//'mongodb+srv://tabhi1957:vHq3hGX8bRxPndMa@cluster0.3xkmg.mongodb.net/'
//mongodb://localhost:27017/
//mongodb://localhost:27017/firstdatabse
//mongodb://localhost:27017/firstdatabse
//mongodb+srv://tabhi1957:vHq3hGX8bRxPndMa@cluster0.3xkmg.mongodb.net/
