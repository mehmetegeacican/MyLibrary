import express from 'express';
import routes from './routes/routes';
//Express initialization
const app:express.Application = express();


//Middleware
app.use(express.json()); // Parse JSON request bodies
//Routes
app.use('/api/v1/categories',routes);
//Exports
export default app;
