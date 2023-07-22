const request = require('supertest');
const app = require('../app');
const {executeGetAllBooks} = require('../model/book');

//Step 1 -- Mock the executeGetAllBooks Function
jest.mock('../model/book', () => ({
  executeGetAllBooks: jest.fn(),
}));

//Step 2 -- Mock the Datas
const mockBookData = [
  {id: '1',name: 'Test Book'},
  {id: '2',name: 'Test Book 2'},
]

describe('GET /api/v1/books', function () {
  beforeEach(() => {
    // Reset the call count of the mock function before each test
    executeGetAllBooks.mockClear();
  });

  describe('getAllBooks', () => {
    it('Should Return the Books in the DB', async function () {
      // Mock the response from executeGetAllBooks
      executeGetAllBooks.mockResolvedValue(mockBookData);

      const response = await request(app).get('/api/v1/books');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockBookData);
      //Verify
      expect(executeGetAllBooks).toHaveBeenCalledTimes(1);
    });
    it('Should Return a 500 Error if the db is not usable', async function () {
      const mockError = 'DB Access unsuccessful';
      executeGetAllBooks.mockRejectedValue(mockError);
    
      const response = await request(app).get('/api/v1/books');
      //Expect and Verify
      expect(response.status).toBe(500);
      expect(response.body.error).toBe('DB Access unsuccessful');
      expect(executeGetAllBooks).toHaveBeenCalledTimes(1);
    });
  });
});
