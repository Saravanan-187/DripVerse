const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const resetDb = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env');
        }

        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const collections = await mongoose.connection.db.listCollections().toArray();

        if (collections.length === 0) {
            console.log('No collections found to delete.');
        } else {
            console.log(`Found ${collections.length} collections:`, collections.map(c => c.name).join(', '));

            for (const collection of collections) {
                // Skip system collections if any (though usually safe to drop user collections)
                if (collection.name.startsWith('system.')) continue;

                await mongoose.connection.db.dropCollection(collection.name);
                console.log(`Dropped collection: ${collection.name}`);
            }
            console.log('All collections dropped successfully.');
        }

        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error resetting database:', error);
        process.exit(1);
    }
};

resetDb();
