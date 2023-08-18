import app from './app';
import dotenv from 'dotenv';

//Env Variables config
dotenv.config();
const port = process.env.PORT;
//Start the server
try {
    app.listen(4000, () => {
      console.log(`Server is running on port ${4000}`);
    });
  } catch (error) {
    console.error('Error occurred:', error);
}