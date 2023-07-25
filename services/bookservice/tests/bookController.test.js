const request = require('supertest');
const app = require('../app');
const {executeGetAllBooks, executeGetSpecificBook} = require('../model/book');

//Step 1 -- Mock the executeGetAllBooks Function
jest.mock('../model/book', () => ({
  executeGetAllBooks: jest.fn(),
  executeGetSpecificBook: jest.fn(),
}));

//Step 2 -- Mock the Datas
const mockBookData = [
  {id: '1',name: 'Test Book'},
  {id: '2',name: 'Test Book 2'},
];

/**
 * Test 1 -- api/v1/books scenarios
 */
describe('GET /api/v1/books', function () {
  it('should return 404 page not found', async () => {
    //Given
    //When
    const response = await request(app).get(`/api/v1/books`);
    //Then
    expect(response.status).toBe(404);
  });
});
/**
 * Test 2 -- api/v1/books/all scenarios
 */
describe('GET /api/v1/books/all', function () {
  beforeEach(() => {
    // Reset the call count of the mock function before each test
    executeGetAllBooks.mockClear();
  });

  describe('getAllBooks', () => {
    it('Should Return the Books in the DB', async function () {
      // Mock the response from executeGetAllBooks
      executeGetAllBooks.mockResolvedValue(mockBookData);

      const response = await request(app).get('/api/v1/books/all');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockBookData);
      //Verify
      expect(executeGetAllBooks).toHaveBeenCalledTimes(1);
    });
    it('Should Return a 500 Error if the db is not usable', async function () {
      const mockError = 'DB Access unsuccessful';
      executeGetAllBooks.mockRejectedValue(mockError);
    
      const response = await request(app).get('/api/v1/books/all');
      //Expect and Verify
      expect(response.status).toBe(500);
      //expect(response).toBe('DB Access unsuccessful');
      expect(executeGetAllBooks).toHaveBeenCalledTimes(1);
    });
  });
});

/**
 * Test 3 -- api/v1/books/:id scenarios
 */
describe('GET /api/v1/books/:id', function () {
  beforeEach(() => {
    // Reset the call count of the mock function before each test
    executeGetSpecificBook.mockClear();

  });

  describe('getABookById', () => {
    it('Should Return the Book by Id from the db', async () => {
      //Given
      executeGetSpecificBook.mockResolvedValue(mockBookData[0]); 
      //When
      const response = await request(app).get(`/api/v1/books/${mockBookData[0].id}`);
      //Then
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockBookData[0]);
      //Verify
      expect(executeGetSpecificBook).toHaveBeenCalledTimes(1);
    });
    it('Should Return a 500 Error if the Db is not usable', async () => {
      //Given
      const mockError = 'DB Access unsuccessful';
      executeGetSpecificBook.mockRejectedValue(mockError);
      //When
      const response = await request(app).get(`/api/v1/books/${mockBookData[0].id}`);
      //Then
      expect(response.status).toBe(500);
      //expect(response.body.error).toBe('DB Access Unsuccessful');
      expect(executeGetSpecificBook).toHaveBeenCalledTimes(1);
    });
    it('Should return a 400 error if the parameter is not an integer', async  () => {
      //Given
      //When
      const response = await request(app).get(`/api/v1/books/test`);
      //Then
      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe('ID should be declared as an integer');
      // Verify -- The SQL Query should not be called at all
      expect(executeGetSpecificBook).toHaveBeenCalledTimes(0);
    });
  });
});
