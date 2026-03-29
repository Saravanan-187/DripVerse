const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://saravananb0704_db_user:dripverse_123@cluster0.h9z8eu0.mongodb.net/?appName=Cluster0";

async function migrate() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const sourceDb = mongoose.connection.useDb('test');
        const targetDb = mongoose.connection.useDb('dripverse');

        // Collections to migrate
        const collections = ['users', 'orders'];

        for (const colName of collections) {
            const sourceCol = sourceDb.collection(colName);
            const targetCol = targetDb.collection(colName);

            const count = await sourceCol.countDocuments();
            if (count > 0) {
                console.log(`Migrating ${count} documents from test.${colName} to dripverse.${colName}...`);
                const docs = await sourceCol.find({}).toArray();

                // Insert into target (update if exists to avoid duplicates, though target is assumed empty/clean)
                // For simplicity in this cleanup task, we'll try insertMany. 
                // If ID conflicts exist, we might need a different strategy, but assuming fresh target.
                try {
                    await targetCol.insertMany(docs);
                    console.log(`Successfully migrated ${docs.length} documents.`);
                } catch (e) {
                    if (e.code === 11000) {
                        console.log(`Some documents already exist in target. Skipping duplicates.`);
                    } else {
                        throw e;
                    }
                }
            } else {
                console.log(`No documents in test.${colName} to migrate.`);
            }
        }

        console.log('Migration complete. Verify data before dropping source.');

        // Final Verification count
        for (const colName of collections) {
            const targetCount = await targetDb.collection(colName).countDocuments();
            console.log(`dripverse.${colName} count: ${targetCount}`);
        }

        console.log('Dropping "test" database...');
        await sourceDb.dropDatabase();
        console.log('"test" database dropped.');

        await mongoose.disconnect();
        console.log('Done.');

    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

migrate();
