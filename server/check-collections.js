const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://saravananb0704_db_user:dripverse_123@cluster0.h9z8eu0.mongodb.net/?appName=Cluster0";

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');

        const dbsToCheck = ['dripverse', 'test'];

        for (const dbName of dbsToCheck) {
            const db = mongoose.connection.useDb(dbName);
            const collections = await db.listCollections();
            console.log(`\nCollections in '${dbName}':`);
            if (collections.length === 0) {
                console.log('  (empty)');
            } else {
                collections.forEach(c => console.log(`- ${c.name}`));
            }
        }

        mongoose.disconnect();
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
