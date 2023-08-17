import app from './app';
import dotenv from 'dotenv';

//Env Variables config
dotenv.config();
const port = process.env.PORT;
//Start the server
try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error occurred:', error);
}