import express from 'express';
import cors from 'cors';
import routes from './routes/routes';
//Express initialization
const app:express.Application = express();


//Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors());
//Routes
app.use('/api/v1/stats',routes);
//Exports
export default app;


