import express from 'express';

/**
 * Express initialization
 */
const app:express.Application = express();

/**
 * Middleware
 */
app.use(express.json()); // Parse JSON request bodies

/**
 * Routes
 */


// Exports
export default app;