const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://saravananb0704_db_user:dripverse_123@cluster0.h9z8eu0.mongodb.net/?appName=Cluster0";

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');

        const dbs = [
            { name: 'dripverse', collections: ['users'] },
            { name: 'test', collections: ['users', 'orders'] }
        ];

        for (const dbInfo of dbs) {
            const db = mongoose.connection.useDb(dbInfo.name);
            console.log(`\nDatabase: ${dbInfo.name}`);
            for (const colName of dbInfo.collections) {
                const count = await db.collection(colName).countDocuments();
                console.log(`  - ${colName}: ${count}`);
            }
        }

        mongoose.disconnect();
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
