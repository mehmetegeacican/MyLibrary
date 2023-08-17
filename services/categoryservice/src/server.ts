import app from './app';

try {
    app.listen(4000, () => {
      console.log(`Server is running on port ${4000}`);
    });
  } catch (error) {
    console.error('Error occurred:', error);
}