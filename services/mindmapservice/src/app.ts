import express from 'express';
import router from './routes/mindmap.route';
import cors from 'cors';

/**
 * Express initialization
 */
const app:express.Application = express();

/**
 * Middleware
 */
app.use(express.json()); // Parse JSON request bodies
app.use(cors());
app.use('/api/v3/mindmaps',router);

/**
 * Routes
 */


// Exports
export default app;