import express from 'express';
import router from './routes/mindmap.route';

/**
 * Express initialization
 */
const app:express.Application = express();

/**
 * Middleware
 */
app.use(express.json()); // Parse JSON request bodies
app.use('/api/v1/mindmaps',router);

/**
 * Routes
 */


// Exports
export default app;