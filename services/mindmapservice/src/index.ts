import dotenv from 'dotenv';
dotenv.config(); // load environment variables first

import app from './app';
import { connectToMongoDb } from './config/db.config';

const port = 4000;
const mongoURI = process.env.MONGO_URI || '';

const startServer = async () => {
  try {
    const isConnected = await connectToMongoDb(mongoURI);
    if (isConnected) {
      app.listen(port, '0.0.0.0', () => {
        console.log(`Server is running on port ${port}`);
      });
    }
    else {
      console.error('Failed to connect to MongoDB. Server not started.');
      process.exit(1);
    }
  } catch (error) {
    console.error('Server not started ,Error occurred:', error);
  }
};

/**
 * Graceful shutdown (simple)
 */
process.on('SIGINT', async () => {
  // e.g. await disconnectMongo();
  process.exit(0);
});

/**
 * Server Init
 */
startServer();