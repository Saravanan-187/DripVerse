const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://saravananb0704_db_user:dripverse_123@cluster0.h9z8eu0.mongodb.net/?appName=Cluster0";

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        const admin = mongoose.connection.db.admin();
        const result = await admin.listDatabases();
        console.log('Databases:');
        result.databases.forEach(db => {
            console.log(`- ${db.name} (${db.sizeOnDisk} bytes)`);
        });
        mongoose.disconnect();
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
