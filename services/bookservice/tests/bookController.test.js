const request = require('supertest');
const app = require('../app');
const { validationResult } = require('express-validator');
const { addNewBookValidate } = require('../validators/book.validation');
const { executeGetAllBooks, executeGetSpecificBook, executeFindABookByNameAndAuthor, executeInsertNewBook } = require('../model/book');

//Step 1 -- Mock the executeGetAllBooks Function
jest.mock('../model/book', () => ({
  executeGetAllBooks: jest.fn(),
  executeGetSpecificBook: jest.fn(),
  executeFindABookByNameAndAuthor: jest.fn(),
  executeInsertNewBook: jest.fn(),
}));

//Step 2 -- Mock the Datas
const mockBookData = [
  { id: '1', name: 'Test Book' },
  { id: '2', name: 'Test Book 2' },
];

const mockNewBookName = "New Book";
const mockNewBookAuthor = "Author 1";
const mockBookCategories = ['Category 1', 'Category 2'];
const mockBookStatus = 'Will Read';

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
    jest.spyOn(console, 'log').mockImplementation(() => { }); // Suppress log messages
  });
  afterEach(() => {
    jest.restoreAllMocks(); // Restore console.log after each test
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
      const mockError = 'Db Connection Unsuccessful';
      executeGetAllBooks.mockRejectedValue(mockError);
      const response = await request(app).get('/api/v1/books/all');
      //Expect and Verify
      expect(response.status).toBe(500);
      expect(response.body.error).toBe(mockError);
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
    jest.spyOn(console, 'log').mockImplementation(() => { }); // Suppress log messages
  });
  afterEach(() => {
    jest.restoreAllMocks(); // Restore console.log after each test
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
      const mockError = 'Db Access Unsuccessful';
      executeGetSpecificBook.mockRejectedValue(mockError);
      //When
      const response = await request(app).get(`/api/v1/books/${mockBookData[0].id}`);
      //Then
      expect(response.status).toBe(500);
      expect(response.body.error).toBe(mockError);
      expect(executeGetSpecificBook).toHaveBeenCalledTimes(1);
    });
    it('Should return a 400 error if the parameter is not an integer', async () => {
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

/**
 * Test 4 -- api/v1/books POST Scenarios
 */
describe('POST /api/v1/books', function () {
  beforeEach(() => {
    // Reset the call count of the mock functions before each test
    executeFindABookByNameAndAuthor.mockClear();
    executeInsertNewBook.mockClear();
    jest.spyOn(console, 'log').mockImplementation(() => { }); // Suppress log messages
  });
  afterEach(() => {
    jest.restoreAllMocks(); // Restore console.log after each test
  });
  it('should successfully insert a new book to the db', async () => {
    //Given
    const mockReqBody = {
      bookName: mockNewBookName,
      author: mockNewBookAuthor,
      bookCategories: mockBookCategories,
      bookStatus: 'Red',
    }
    const mockInsertionResult = 'Data Successfully inserted';
    executeFindABookByNameAndAuthor.mockResolvedValue([]);
    executeInsertNewBook.mockResolvedValue(mockInsertionResult);
    //When
    const response = await request(app).post('/api/v1/books').send(mockReqBody);
    //Then
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: mockInsertionResult });

    expect(executeFindABookByNameAndAuthor).toHaveBeenCalledWith('New Book', 'Author 1');
    expect(executeInsertNewBook).toHaveBeenCalledWith(mockNewBookName, mockNewBookAuthor, mockBookCategories, 'Red');
  });
  it('should not insert a duplicate book to the db', async () => {
    //Given
    const mockReqBody = {
      bookName: mockNewBookName,
      author: mockNewBookAuthor,
      bookCategories: mockBookCategories,
      bookStatus: 'Red',
    }
    const mockInsertionResult = 'The Book Already Exists in the db!';
    executeFindABookByNameAndAuthor.mockResolvedValue([mockBookData[0]]);
    //When
    const response = await request(app).post('/api/v1/books').send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: mockInsertionResult });
    //Verify
    expect(executeFindABookByNameAndAuthor).toHaveBeenCalledWith('New Book', 'Author 1');
    expect(executeFindABookByNameAndAuthor).toHaveBeenCalledTimes(1);
    expect(executeInsertNewBook).toHaveBeenCalledTimes(0);
  });
  it('should give an internal server error in the case of db connection loss', async () => {
    //Given
    const mockReqBody = {
      bookName: 'New Book',
      author: 'Author 1',
      bookCategories: ['Category 1', 'Category 2'],
      bookStatus: 'Red',
    };
    const mockError = new Error('DB Connection Unsuccessful');
    executeFindABookByNameAndAuthor.mockRejectedValue(mockError);
    //When
    const response = await request(app).post('/api/v1/books').send(mockReqBody);
    //Then
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: mockError.message });
    expect(executeFindABookByNameAndAuthor).toHaveBeenCalledWith('New Book', 'Author 1');
    //Verify
    expect(executeFindABookByNameAndAuthor).toHaveBeenCalledTimes(1);
    expect(executeInsertNewBook).toHaveBeenCalledTimes(0);
  });
  it('should not accept empty bookName', async () => {
    //Given
    const mockReqBody = {
      bookName: null,
      author: mockNewBookAuthor,
      bookCategories: mockBookCategories,
      bookStatus: 'Red',
    }
    //When
    const response = await request(app).post('/api/v1/books').send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual("Book Name is Required");
    //Verify
    expect(executeFindABookByNameAndAuthor).toHaveBeenCalledTimes(0);
    expect(executeInsertNewBook).toHaveBeenCalledTimes(0);
  });
  it('should only accept string book names', async () => {
    //Given
    const mockReqBody = {
      bookName: 1,
      author: mockNewBookAuthor,
      bookCategories: mockBookCategories,
      bookStatus: 'Red',
    }
    //When
    const response = await request(app).post('/api/v1/books').send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual("Book Name must be a string");
    //Verify
    expect(executeFindABookByNameAndAuthor).toHaveBeenCalledTimes(0);
    expect(executeInsertNewBook).toHaveBeenCalledTimes(0);
  });
  it('should not accept empty author name', async () => {
    //Given
    const mockReqBody = {
      bookName: mockNewBookName,
      author: null,
      bookCategories: mockBookCategories,
      bookStatus: 'Red',
    }
    //When
    const response = await request(app).post('/api/v1/books').send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual("Author name is required");
    //Verify
    expect(executeFindABookByNameAndAuthor).toHaveBeenCalledTimes(0);
    expect(executeInsertNewBook).toHaveBeenCalledTimes(0);
  });
  it('should only accept a string author name', async () => {
    //Given
    const mockReqBody = {
      bookName: mockNewBookName,
      author: 1,
      bookCategories: mockBookCategories,
      bookStatus: 'Red',
    }
    //When
    const response = await request(app).post('/api/v1/books').send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual("Author Name must be a string");
    //Verify
    expect(executeFindABookByNameAndAuthor).toHaveBeenCalledTimes(0);
    expect(executeInsertNewBook).toHaveBeenCalledTimes(0);
  });
  it('should only accept status values that are either Red,Reading or Will Read', async () => {
    //Given
    const mockReqBody = {
      bookName: mockNewBookName,
      author: mockNewBookAuthor,
      bookCategories: mockBookCategories,
      bookStatus: 'Available',
    }
    //When
    const response = await request(app).post('/api/v1/books').send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual("Status can only be one of the three: Red, Reading, Will Read");
    //Verify
    expect(executeFindABookByNameAndAuthor).toHaveBeenCalledTimes(0);
    expect(executeInsertNewBook).toHaveBeenCalledTimes(0);
  });
  it('should only accept string values as a parameter for Status', async () => {
    //Given
    const mockReqBody = {
      bookName: mockNewBookName,
      author: mockNewBookAuthor,
      bookCategories: mockBookCategories,
      bookStatus: 1,
    }
    //When
    const response = await request(app).post('/api/v1/books').send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual("Status must be a string");
    //Verify
    expect(executeFindABookByNameAndAuthor).toHaveBeenCalledTimes(0);
    expect(executeInsertNewBook).toHaveBeenCalledTimes(0);
  });
  it('should not accept empty status', async () => {
    //Given
    const mockReqBody = {
      bookName: mockNewBookName,
      author: mockNewBookAuthor,
      bookCategories: mockBookCategories,
      bookStatus: null,
    }
    //When
    const response = await request(app).post('/api/v1/books').send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual("Status must not be empty");
    //Verify
    expect(executeFindABookByNameAndAuthor).toHaveBeenCalledTimes(0);
    expect(executeInsertNewBook).toHaveBeenCalledTimes(0);
  });
  it('should only accept book categories that are an array of string', async () => {
    const invalidReqBody = {
      bookName: 'New Book',
      author: 'Author 1',
      bookCategories: ['Category 1', 42],
      bookStatus: 'Reading',
    };
    //When
    const response = await request(app).post('/api/v1/books').send(invalidReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.errors.length).toEqual(1);
    expect(response.body.errors[0].msg).toEqual("The Categories must be an array of strings");
    //Verify
    expect(executeFindABookByNameAndAuthor).toHaveBeenCalledTimes(0);
    expect(executeInsertNewBook).toHaveBeenCalledTimes(0);
  });
});
