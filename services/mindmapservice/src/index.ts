import dotenv from 'dotenv';
dotenv.config(); // load environment variables first

import app from './app';

const port = process.env.PORT || 4000;

const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error occurred:', error);
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