import express from 'express';
import cors from 'cors';
//Express initialization
const app:express.Application = express();


//Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors());
//Routes
//Exports
export default app;


