const request = require('supertest');
const app = require('../app');
const { executeGetAllBooks, executeGetSpecificBook, executeFindABookByName, executeInsertNewBook, executeDeleteABookViaId, executeUpdateBook} = require('../model/book');

//Step 1 -- Mock the executeGetAllBooks Function
jest.mock('../model/book', () => ({
  executeGetAllBooks: jest.fn(),
  executeGetSpecificBook: jest.fn(),
  executeFindABookByName: jest.fn(),
  executeInsertNewBook: jest.fn(),
  executeDeleteABookViaId: jest.fn(),
  executeUpdateBook: jest.fn()
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
const mockBookAuthors = ["author 1"]

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
    executeFindABookByName.mockClear();
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
      desc: mockNewBookAuthor,
      bookCategories: mockBookCategories,
      bookStatus: 'Red',
      bookAuthors: mockBookAuthors
    }
    const mockInsertionResult = 'Data Successfully inserted';
    executeFindABookByName.mockResolvedValue([]);
    executeInsertNewBook.mockResolvedValue(mockInsertionResult);
    //When
    const response = await request(app).post('/api/v1/books').send(mockReqBody);
    //Then
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: mockInsertionResult });

    expect(executeFindABookByName).toHaveBeenCalledWith('New Book');
    expect(executeInsertNewBook).toHaveBeenCalledWith(mockNewBookName, mockNewBookAuthor, mockBookCategories, 'Red',mockBookAuthors);
  });
  it('should not insert a duplicate book to the db', async () => {
    //Given
    const mockReqBody = {
      bookName: mockNewBookName,
      desc: mockNewBookAuthor,
      bookCategories: mockBookCategories,
      bookStatus: 'Red',
    }
    const mockInsertionResult = 'The Book Already Exists in the db!';
    executeFindABookByName.mockResolvedValue([mockBookData[0]]);
    //When
    const response = await request(app).post('/api/v1/books').send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: mockInsertionResult });
    //Verify
    expect(executeFindABookByName).toHaveBeenCalledWith('New Book');
    expect(executeFindABookByName).toHaveBeenCalledTimes(1);
    expect(executeInsertNewBook).toHaveBeenCalledTimes(0);
  });
  it('should give an internal server error in the case of db connection loss', async () => {
    //Given
    const mockReqBody = {
      bookName: 'New Book',
      desc: 'Author 1',
      bookCategories: ['Category 1', 'Category 2'],
      bookStatus: 'Red',
    };
    const mockError = new Error('DB Connection Unsuccessful');
    executeFindABookByName.mockRejectedValue(mockError);
    //When
    const response = await request(app).post('/api/v1/books').send(mockReqBody);
    //Then
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: mockError.message });
    expect(executeFindABookByName).toHaveBeenCalledWith('New Book');
    //Verify
    expect(executeFindABookByName).toHaveBeenCalledTimes(1);
    expect(executeInsertNewBook).toHaveBeenCalledTimes(0);
  });
  it('should not accept empty bookName', async () => {
    //Given
    const mockReqBody = {
      bookName: null,
      desc: mockNewBookAuthor,
      bookCategories: mockBookCategories,
      bookStatus: 'Red',
    }
    //When
    const response = await request(app).post('/api/v1/books').send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual("Book Name is Required");
    //Verify
    expect(executeFindABookByName).toHaveBeenCalledTimes(0);
    expect(executeInsertNewBook).toHaveBeenCalledTimes(0);
  });
  it('should only accept string book names', async () => {
    //Given
    const mockReqBody = {
      bookName: 1,
      desc: mockNewBookAuthor,
      bookCategories: mockBookCategories,
      bookStatus: 'Red',
    }
    //When
    const response = await request(app).post('/api/v1/books').send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual("Book Name must be a string");
    //Verify
    expect(executeFindABookByName).toHaveBeenCalledTimes(0);
    expect(executeInsertNewBook).toHaveBeenCalledTimes(0);
  });
  it('should not accept empty description', async () => {
    //Given
    const mockReqBody = {
      bookName: mockNewBookName,
      desc: null,
      bookCategories: mockBookCategories,
      bookStatus: 'Red',
    }
    //When
    const response = await request(app).post('/api/v1/books').send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual("Description is required");
    //Verify
    expect(executeFindABookByName).toHaveBeenCalledTimes(0);
    expect(executeInsertNewBook).toHaveBeenCalledTimes(0);
  });
  it('should only accept a string author name', async () => {
    //Given
    const mockReqBody = {
      bookName: mockNewBookName,
      desc: 1,
      bookCategories: mockBookCategories,
      bookStatus: 'Red',
    }
    //When
    const response = await request(app).post('/api/v1/books').send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual("Description  must be a string");
    //Verify
    expect(executeFindABookByName).toHaveBeenCalledTimes(0);
    expect(executeInsertNewBook).toHaveBeenCalledTimes(0);
  });
  it('should only accept status values that are either Red,Reading or Will Read', async () => {
    //Given
    const mockReqBody = {
      bookName: mockNewBookName,
      desc: mockNewBookAuthor,
      bookCategories: mockBookCategories,
      bookStatus: 'Available',
    }
    //When
    const response = await request(app).post('/api/v1/books').send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual("Status can only be one of the three: Red, Reading, Will Read");
    //Verify
    expect(executeFindABookByName).toHaveBeenCalledTimes(0);
    expect(executeInsertNewBook).toHaveBeenCalledTimes(0);
  });
  it('should only accept string values as a parameter for Status', async () => {
    //Given
    const mockReqBody = {
      bookName: mockNewBookName,
      desc: mockNewBookAuthor,
      bookCategories: mockBookCategories,
      bookStatus: 1,
    }
    //When
    const response = await request(app).post('/api/v1/books').send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual("Status must be a string");
    //Verify
    expect(executeFindABookByName).toHaveBeenCalledTimes(0);
    expect(executeInsertNewBook).toHaveBeenCalledTimes(0);
  });
  it('should not accept empty status', async () => {
    //Given
    const mockReqBody = {
      bookName: mockNewBookName,
      desc: mockNewBookAuthor,
      bookCategories: mockBookCategories,
      bookStatus: null,
    }
    //When
    const response = await request(app).post('/api/v1/books').send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual("Status must not be empty");
    //Verify
    expect(executeFindABookByName).toHaveBeenCalledTimes(0);
    expect(executeInsertNewBook).toHaveBeenCalledTimes(0);
  });
  it('should only accept book categories as array', async () => {
    const invalidReqBody = {
      bookName: 'New Book',
      desc: 'Author 1',
      bookCategories: 'Category 1, Category 2',
      bookStatus: 'Reading',
    };
    //When
    const response = await request(app).post('/api/v1/books').send(invalidReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.errors.length).toEqual(1);
    expect(response.body.errors[0].msg).toEqual("The Categories must be an array of strings");
    //Verify
    expect(executeFindABookByName).toHaveBeenCalledTimes(0);
    expect(executeInsertNewBook).toHaveBeenCalledTimes(0);
  });
  it('should only accept book categories that are an array of string', async () => {
    const invalidReqBody = {
      bookName: 'New Book',
      desc: 'Author 1',
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
    expect(executeFindABookByName).toHaveBeenCalledTimes(0);
    expect(executeInsertNewBook).toHaveBeenCalledTimes(0);
  });
});

/**
 * Test 5 -- api/v1/books/:id DELETE Scenarios
 */
describe('DELETE /api/v1/books/:id', function (){
  beforeEach(() => {
    // Reset the call count of the mock function before each test
    executeDeleteABookViaId.mockClear();
    executeGetSpecificBook.mockClear();
    jest.spyOn(console, 'log').mockImplementation(() => { }); // Suppress log messages
  });
  afterEach(() => {
    jest.restoreAllMocks(); // Restore console.log after each test
  });

  it('should successfully delete a book', async () => {
    //Given
    executeGetSpecificBook.mockResolvedValue(mockBookData[0]);
    const mockDeletionResult = 'Data Successfully deleted';
    executeDeleteABookViaId.mockResolvedValue(mockDeletionResult);
    //When
    const response = await request(app).delete(`/api/v1/books/${mockBookData[0].id}`)
    //Then
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual(mockDeletionResult);
    //Verify
    expect(executeGetSpecificBook).toHaveBeenCalledTimes(1);
    expect(executeDeleteABookViaId).toHaveBeenCalledTimes(1);
  });

  it('should return a 500 error if the db is not usable', async () => {
    //Given
    const mockError = 'Db Access Unsuccessful';
    executeGetSpecificBook.mockRejectedValue(mockError);
    //When
    const response = await request(app).delete(`/api/v1/books/${mockBookData[0].id}`)
    //Then
    expect(response.status).toBe(500);
    expect(response.body.error).toBe(mockError);
    //Verify
    expect(executeGetSpecificBook).toHaveBeenCalledTimes(1);
    expect(executeDeleteABookViaId).toHaveBeenCalledTimes(0);
  });

  it('should return a 400 if the id is in the wrong format', async () => {
    //Given
    //When
    const response = await request(app).delete(`/api/v1/books/test`);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('ID should be declared as an integer');
    // Verify -- The SQL Query should not be called at all
    expect(executeGetSpecificBook).toHaveBeenCalledTimes(0);
    expect(executeDeleteABookViaId).toHaveBeenCalledTimes(0);
  });

  it('should return a 400 if there is no data with the given id found', async () => {
    //Given
    executeGetSpecificBook.mockResolvedValue([]);
    //When
    const response = await request(app).delete(`/api/v1/books/1`);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('The Book with the given ID does not exist in the system!');
    //Verify
    expect(executeGetSpecificBook).toHaveBeenCalledTimes(1);
    expect(executeDeleteABookViaId).toHaveBeenCalledTimes(0);
  });

});

/**
 * Test 6 -- api/v1/books/:id PUT Scenarios 
 */
describe('PUT /api/v1/books/:id', function () {
  beforeEach(() => {
    // Reset the call count of the mock function before each test
    executeFindABookByName.mockClear();
    executeGetSpecificBook.mockClear();
    executeUpdateBook.mockClear();
    jest.spyOn(console, 'log').mockImplementation(() => { }); // Suppress log messages
  });
  afterEach(() => {
    jest.restoreAllMocks(); // Restore console.log after each test
  });
  it('should successfully update an existing book in the db', async () => {
    //Given
    const mockReqBody = {
      bookName: mockNewBookName,
      desc: mockNewBookAuthor,
      bookCategories: mockBookCategories,
      bookStatus: 'Red',
    }
    const mockResult = [ {
      id : 1,
      name: "Updated Book",
      author: "Author 1"
    }
    ]
    const mockId = 1;
    const mockUpdateResult = 'Data Successfully updated';
    executeFindABookByName.mockResolvedValue(mockResult);
    executeUpdateBook.mockResolvedValue(mockUpdateResult);
    executeGetSpecificBook.mockResolvedValue([mockBookData[0]]);
    //When
    const response = await request(app).put(`/api/v1/books/${mockId}`).send(mockReqBody);
    //Then
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: mockUpdateResult });

    expect(executeFindABookByName).toHaveBeenCalledWith(mockNewBookName);
    expect(executeUpdateBook).toHaveBeenCalledWith(mockId.toString(),mockNewBookName, mockNewBookAuthor, mockBookCategories, 'Red');
    //Verify
    expect(executeGetSpecificBook).toHaveBeenCalledTimes(1);
    expect(executeFindABookByName).toHaveBeenCalledTimes(1);
    expect(executeUpdateBook).toHaveBeenCalledTimes(1);
  });
  it('should give an internal server error for not accessing to the db',async () => {
    //Given
    const mockId = 1;
    const mockReqBody = {
      bookName: 'New Book',
      desc: 'Author 1',
      bookCategories: ['Category 1', 'Category 2'],
      bookStatus: 'Red',
    };
    const mockError = new Error('DB Connection Unsuccessful');
    executeGetSpecificBook.mockRejectedValue(mockError);
    //When
    const response = await request(app).put(`/api/v1/books/${mockId}`).send(mockReqBody);
    //Then
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: mockError.message });
    expect(executeGetSpecificBook).toHaveBeenCalledWith(mockId.toString());
    //Verify
    expect(executeGetSpecificBook).toHaveBeenCalledTimes(1);
    expect(executeFindABookByName).toHaveBeenCalledTimes(0);
    expect(executeUpdateBook).toHaveBeenCalledTimes(0);
  });
  it('should give 400 error if the book with the given id is not found', async () => {
    //Given
    const mockId = 1;
    const mockReqBody = {
      bookName: 'New Book',
      desc: 'Author 1',
      bookCategories: ['Category 1', 'Category 2'],
      bookStatus: 'Red',
    };
    executeGetSpecificBook.mockResolvedValue([]);
    //When
    const response = await request(app).put(`/api/v1/books/${mockId}`).send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "The ID does not exist!" });
    expect(executeGetSpecificBook).toHaveBeenCalledWith(mockId.toString());
    //Verify
    expect(executeGetSpecificBook).toHaveBeenCalledTimes(1);
    expect(executeFindABookByName).toHaveBeenCalledTimes(0);
    expect(executeUpdateBook).toHaveBeenCalledTimes(0);
  });
  it('should give a 400 error if the user is trying to update the book name with a name and author combo that already exists with a different Id', async () => {
    //Given
    const mockReqBody = {
      bookName: mockNewBookName,
      desc: mockNewBookAuthor,
      bookCategories: mockBookCategories,
      bookStatus: 'Red',
    }
    const mockResult = [ 
      {
        id : 2,
        name: mockNewBookName,
        author: mockNewBookAuthor
      }
    ]
    const mockId = 1;
    executeFindABookByName.mockResolvedValue(mockResult);
    executeGetSpecificBook.mockResolvedValue([mockBookData[0]]);
    //When
    const response = await request(app).put(`/api/v1/books/${mockId}`).send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "There already is a book with the updated name and author" });
    expect(executeGetSpecificBook).toHaveBeenCalledWith(mockId.toString());
    //Verify
    expect(executeGetSpecificBook).toHaveBeenCalledTimes(1);
    expect(executeFindABookByName).toHaveBeenCalledTimes(1);
    expect(executeUpdateBook).toHaveBeenCalledTimes(0);
  });
  it('should give a 400 error if the book Id is entered as string', async () => {
    //Given
    const mockId = "asd";
    const mockReqBody = {
      bookName: 'New Book',
      desc: 'Desc 1',
      bookCategories: ['Category 1', 'Category 2'],
      bookStatus: 'Red',
    };
    //When
    const response = await request(app).put(`/api/v1/books/${mockId}`).send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual("ID should be declared as an integer");
    //Verify
    expect(executeGetSpecificBook).toHaveBeenCalledTimes(0);
    expect(executeFindABookByName).toHaveBeenCalledTimes(0);
    expect(executeUpdateBook).toHaveBeenCalledTimes(0);
  });
  it('should give a 400 error if the book name is empty', async () => {
    //Given
    const mockId = 1;
    const mockReqBody = {
      bookName: null,
      desc: 'Desc 1',
      bookCategories: ['Category 1', 'Category 2'],
      bookStatus: 'Red',
    };
    //When
    const response = await request(app).put(`/api/v1/books/${mockId}`).send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual("Book Name is Required");
    //Verify
    expect(executeGetSpecificBook).toHaveBeenCalledTimes(0);
    expect(executeFindABookByName).toHaveBeenCalledTimes(0);
    expect(executeUpdateBook).toHaveBeenCalledTimes(0);
  });
  it('should give a 400 error if the book name is not a string', async () => {
    //Given
    const mockId = 1;
    const mockReqBody = {
      bookName: 1,
      desc: 'Description 1',
      bookCategories: ['Category 1', 'Category 2'],
      bookStatus: 'Red',
    };
    //When
    const response = await request(app).put(`/api/v1/books/${mockId}`).send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual("Book Name must be a string");
    //Verify
    expect(executeGetSpecificBook).toHaveBeenCalledTimes(0);
    expect(executeFindABookByName).toHaveBeenCalledTimes(0);
    expect(executeUpdateBook).toHaveBeenCalledTimes(0);
  });
  it('should give a 400 error if the desc is empty', async () => {
    //Given
    const mockId = 1;
    const mockReqBody = {
      bookName: "Updated Book",
      desc: null,
      bookCategories: ['Category 1', 'Category 2'],
      bookStatus: 'Red',
    };
    //When
    const response = await request(app).put(`/api/v1/books/${mockId}`).send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual("Description is required");
    //Verify
    expect(executeGetSpecificBook).toHaveBeenCalledTimes(0);
    expect(executeFindABookByName).toHaveBeenCalledTimes(0);
    expect(executeUpdateBook).toHaveBeenCalledTimes(0);
  });
  it('should give a 400 error if the author is not a string', async () => {
    //Given
    const mockId = 1;
    const mockReqBody = {
      bookName: "Updated Book",
      desc: 1,
      bookCategories: ['Category 1', 'Category 2'],
      bookStatus: 'Red',
    };
    //When
    const response = await request(app).put(`/api/v1/books/${mockId}`).send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual("Description  must be a string");
    //Verify
    expect(executeGetSpecificBook).toHaveBeenCalledTimes(0);
    expect(executeFindABookByName).toHaveBeenCalledTimes(0);
    expect(executeUpdateBook).toHaveBeenCalledTimes(0);
  });
  it('should give a 400 error if book status is empty', async () => {
    //Given
    const mockId = 1;
    const mockReqBody = {
      bookName: "Updated Book",
      desc: "Description 1",
      bookCategories: ['Category 1', 'Category 2'],
      bookStatus: null,
    };
    //When
    const response = await request(app).put(`/api/v1/books/${mockId}`).send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual("Status must not be empty");
    //Verify
    expect(executeGetSpecificBook).toHaveBeenCalledTimes(0);
    expect(executeFindABookByName).toHaveBeenCalledTimes(0);
    expect(executeUpdateBook).toHaveBeenCalledTimes(0);
  });
  it('should give a 400 error if book status is not a string', async () => {
    //Given
    const mockId = 1;
    const mockReqBody = {
      bookName: "Updated Book",
      desc: "Description 1",
      bookCategories: ['Category 1', 'Category 2'],
      bookStatus: 1,
    };
    //When
    const response = await request(app).put(`/api/v1/books/${mockId}`).send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual("Status must be a string");
    //Verify
    expect(executeGetSpecificBook).toHaveBeenCalledTimes(0);
    expect(executeFindABookByName).toHaveBeenCalledTimes(0);
    expect(executeUpdateBook).toHaveBeenCalledTimes(0);
  });
  it('should give a 400 error if book status is not one of the following (Red,Reading,Will Read)', async () => {
    //Given
    const mockId = 1;
    const mockReqBody = {
      bookName: "Updated Book",
      desc: "Description 1",
      bookCategories: ['Category 1', 'Category 2'],
      bookStatus: "Available",
    };
    //When
    const response = await request(app).put(`/api/v1/books/${mockId}`).send(mockReqBody);
    //Then
    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toEqual("Status can only be one of the three: Red, Reading, Will Read");
    //Verify
    expect(executeGetSpecificBook).toHaveBeenCalledTimes(0);
    expect(executeFindABookByName).toHaveBeenCalledTimes(0);
    expect(executeUpdateBook).toHaveBeenCalledTimes(0);
  });
  it('should give a 400 error if the book categories are not a string array', async () => {
     //Given
     const mockId = 1;
     const mockReqBody = {
       bookName: "Updated Book",
       desc: "Description 1",
       bookCategories: ['Category 1',2],
       bookStatus: "Red",
     };
     //When
     const response = await request(app).put(`/api/v1/books/${mockId}`).send(mockReqBody);
     //Then
     expect(response.status).toBe(400);
     expect(response.body.errors[0].msg).toEqual('The Categories must be an array of strings');
     //Verify
     expect(executeGetSpecificBook).toHaveBeenCalledTimes(0);
     expect(executeFindABookByName).toHaveBeenCalledTimes(0);
     expect(executeUpdateBook).toHaveBeenCalledTimes(0);
  });
});
