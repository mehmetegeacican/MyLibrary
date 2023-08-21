import app from './app';

const port = 4000;

//Start the server
try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error occurred:', error);
}