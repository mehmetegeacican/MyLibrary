const { executeGetAllBooks, executeGetSpecificBook, executeFindABookByName , executeInsertNewBook, executeDeleteABookViaId, executeUpdateBook} = require('../model/book');
const { connectDb, closeDb } = require('../dbconnection');

//Mock the ConnectDb & CloseDb
jest.mock('../dbconnection', () => ({
    connectDb: jest.fn(),
    closeDb: jest.fn(),
}));

// Mock the database response
const mockBooksData = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
];

const mockBookDataFiltered = [
    { id: 1, title: 'Book 1', author: 'Author 1' }
]

describe('executeGetAllBooks', () => {
    beforeEach(() => {
        // Reset the call count of the mock function before each test
        connectDb.mockClear();
        closeDb.mockClear();
        jest.spyOn(console, 'log').mockImplementation(() => {}); // Suppress log messages
    });

    afterEach(() => {
        jest.restoreAllMocks(); // Restore console.log after each test
    });

    it('should retrieve all the books from the db', async () => {
        const mockQueryResult = { rows: mockBooksData };
        const mockClient = { query: jest.fn().mockResolvedValue(mockQueryResult) };
        // Mock the database connection function to return the client
        connectDb.mockResolvedValue(mockClient);
        const result = await executeGetAllBooks(1);
        //Expectations
        expect(mockClient.query).toHaveBeenCalledWith(`SELECT * FROM books WHERE user_id = ${1} ORDER BY ID ASC`);
        expect(result).toEqual(mockBooksData);
        expect(closeDb).toHaveBeenCalledWith(mockClient);
        //Verify
        expect(connectDb).toHaveBeenCalledTimes(1);
        expect(mockClient.query).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledTimes(1);
    });
    it('should handle the db query error', async () => {
        // Given
        const mockClient = { query: jest.fn().mockRejectedValue('DB Error') };
        connectDb.mockResolvedValue(mockClient);
        // Mock the database closure function to throw an error
        const closeDbError = new Error('Db Access Unsuccessful');
        closeDb.mockRejectedValue(closeDbError);
        //When
        await expect(executeGetAllBooks()).rejects.toThrow('Db Access Unsuccessful');
        
        //Then
        expect(connectDb).toHaveBeenCalledTimes(1);
        expect(mockClient.query).toHaveBeenCalledTimes(1);

        
        expect(closeDb).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledWith(mockClient);
    });
});


describe('executeGetSpecificBook', () => {
    beforeEach(() => {
      // Reset the call count of the mock function before each test
      connectDb.mockClear();
      closeDb.mockClear();
      // Mock the database closure function with a resolved Promise
      closeDb.mockResolvedValue();
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Restore console.log after each test
    });
  
    it('should retrieve the data from the db', async () => {
        // Given
        const mockBookId = 1;
        const mockQueryResult = { rows: mockBookDataFiltered };
        const mockClient = { query: jest.fn().mockResolvedValue(mockQueryResult) };
        connectDb.mockResolvedValue(mockClient);
        // When
        const result = await executeGetSpecificBook(mockBookId);
        //Then
        expect(mockClient.query).toHaveBeenCalledWith(`SELECT * FROM books WHERE id = ${mockBookId}`);
        expect(result).toEqual(mockBookDataFiltered);
        //Verify
        expect(connectDb).toHaveBeenCalledTimes(1);
        expect(mockClient.query).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledWith(mockClient);
    });
  
    it('should handle the db error', async () => {
      // Given
      const mockBookId = 1;
      const mockClient = { query: jest.fn().mockRejectedValue('DB Error') };
      connectDb.mockResolvedValue(mockClient);
  
      // Mock the database closure function to throw an error
      const closeDbError = new Error('Db Access Unsuccessful');
      closeDb.mockRejectedValue(closeDbError);
  
      // When
      await expect(executeGetSpecificBook(mockBookId)).rejects.toThrow('Db Access Unsuccessful');
  
      // Then
      expect(connectDb).toHaveBeenCalledTimes(1);
      expect(mockClient.query).toHaveBeenCalledTimes(1);
      expect(mockClient.query).toHaveBeenCalledWith(`SELECT * FROM books WHERE id = ${mockBookId}`);
  
      expect(closeDb).toHaveBeenCalledTimes(1);
      expect(closeDb).toHaveBeenCalledWith(mockClient);
      
    });
});

describe('executeFindABookByName', () => {
    beforeEach(() => {
        // Reset the call count of the mock function before each test
        connectDb.mockClear();
        closeDb.mockClear();
        jest.spyOn(console, 'log').mockImplementation(() => {}); // Suppress log messages
        // Mock the database closure function with a resolved Promise
        closeDb.mockResolvedValue();
    });

    it('should retrieve a book via its name and its description', async () => {
        // Given
        const bookName = 'Book 1';
        const desc = 'Desc 1';
        const mockQueryResult = { rows: mockBookDataFiltered };
        const mockClient = { query: jest.fn().mockResolvedValue(mockQueryResult) };
        connectDb.mockResolvedValue(mockClient);
        //When 
        const result = await executeFindABookByName(bookName,1);
        //Then
        expect(mockClient.query).toHaveBeenCalledWith(
            'SELECT * FROM books WHERE UPPER(name) = UPPER($1) AND user_id = $2',
            [bookName,1]
        );
        expect(result).toEqual(mockBookDataFiltered);
        //Verify
        expect(mockClient.query).toHaveBeenCalledTimes(1);
        expect(connectDb).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledWith(mockClient);
    });

    it('should handle the db', async () => {
        //Given
        const bookName = 'Book 1';
        const mockError = new Error('DB Connection Unsuccessful');
        const mockClient = { query: jest.fn().mockRejectedValue(mockError) };
        connectDb.mockResolvedValue(mockClient);
        //When
        await expect(executeFindABookByName(bookName,1)).rejects.toThrow('Db Connection Unsuccessful');
        //Then
        expect(mockClient.query).toHaveBeenCalledWith(
            'SELECT * FROM books WHERE UPPER(name) = UPPER($1) AND user_id = $2',
            [bookName,1]
        );
        //Verify
        expect(mockClient.query).toHaveBeenCalledTimes(1);
        expect(connectDb).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledWith(mockClient);
    });

});

describe('executeInsertNewBook', () => {
    beforeEach(() => {
        // Reset the call count of the mock function before each test
        connectDb.mockClear();
        closeDb.mockClear();
        // Mock the database closure function with a resolved Promise
        closeDb.mockResolvedValue();
        jest.spyOn(console, 'log').mockImplementation(() => {}); // Suppress log messages
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Restore console.log after each test
    });

    it('should execute a new book insertion sql', async () => {
        //Given
        const bookName = 'New Book';
        const desc = 'Desc 1';
        const bookCategories = ['Category 1', 'Category 2'];
        const bookAuthors = ['Author 1', 'Author 2'];
        const bookStatus = 'Will Read';
        const mockClient = { query: jest.fn().mockResolvedValue() };
        connectDb.mockResolvedValue(mockClient);
        //When
        const result = await executeInsertNewBook(bookName,desc,bookCategories,bookStatus,bookAuthors,1);
        //Then
        expect(mockClient.query).toHaveBeenCalledWith(`INSERT INTO books (name, description, entered, category, status,authors,user_id) VALUES($1, $2, $3, $4, $5,$6,$7)`,
            [
              bookName,
              desc,
              expect.any(String),
              expect.any(String),
              bookStatus,
              expect.any(String),
              1
            ]
        );
        expect(result).toBe('Data Successfully inserted');
        //Verify
        expect(connectDb).toHaveBeenCalledTimes(1);
        expect(mockClient.query).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledWith(mockClient);
    });

    it('should throw an error if the db connection is not successfull', async () => {
        //Given
        const bookName = 'New Book';
        const desc = 'Desc 1';
        const bookCategories = ['Category 1', 'Category 2'];
        const bookStatus = 'Will Read';
        const bookAuthors = ['Author 1', 'Author 2'];
        const mockError = new Error('DB Connection Unsuccessful');
        const mockClient = { query: jest.fn().mockRejectedValue(mockError) };
        connectDb.mockResolvedValue(mockClient);
        //When
        await expect(executeInsertNewBook(bookName, desc, bookCategories, bookStatus,bookAuthors,1)).rejects.toThrow('Db Connection Unsuccessful');
        //Then
        expect(mockClient.query).toHaveBeenCalledWith(`INSERT INTO books (name, description, entered, category, status,authors,user_id) VALUES($1, $2, $3, $4, $5,$6,$7)`,
            [
              bookName,
              desc,
              expect.any(String),
              expect.any(String),
              bookStatus,
              expect.any(String),
              1
            ]
        );
        //Verify
        expect(connectDb).toHaveBeenCalledTimes(1);
        expect(mockClient.query).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledWith(mockClient);
    });
});

describe('executeDeleteABookViaId', () => {
    beforeEach(() => {
        // Reset the call count of the mock function before each test
        connectDb.mockClear();
        closeDb.mockClear();
        // Mock the database closure function with a resolved Promise
        closeDb.mockResolvedValue();
        jest.spyOn(console, 'log').mockImplementation(() => {}); // Suppress log messages
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Restore console.log after each test
    });
    it('should execute delete a book via id query', async () => {
        //Given
        const mockClient = { query: jest.fn().mockResolvedValue() };
        connectDb.mockResolvedValue(mockClient);
        const mockId = 1;
        //When
        const result = await executeDeleteABookViaId(mockId);
        //Then
        expect(result).toBe('Data Successfully deleted');
        expect(mockClient.query).toHaveBeenCalledWith('DELETE FROM books WHERE id=$1', [mockId]);
        //Verify
        expect(connectDb).toHaveBeenCalledTimes(1);
        expect(mockClient.query).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledWith(mockClient);
    });
    it('should handle db error', async () => {
       // Given
       const mockClient = { query: jest.fn().mockRejectedValue('DB Error') };
       connectDb.mockResolvedValue(mockClient);
       const mockId = 1;
       // Mock the database closure function to throw an error
       const closeDbError = new Error('Db Access Unsuccessful');
       closeDb.mockRejectedValue(closeDbError);
       //When
       await expect(executeDeleteABookViaId(mockId)).rejects.toThrow('Db Access Unsuccessful');
       //Then
       expect(connectDb).toHaveBeenCalledTimes(1);
       expect(mockClient.query).toHaveBeenCalledTimes(1);
       expect(closeDb).toHaveBeenCalledTimes(1);
       expect(closeDb).toHaveBeenCalledWith(mockClient);
    });
});

describe('executeUpdateBook', () => {
    beforeEach(() => {
        // Reset the call count of the mock function before each test
        connectDb.mockClear();
        closeDb.mockClear();
        // Mock the database closure function with a resolved Promise
        closeDb.mockResolvedValue();
        jest.spyOn(console, 'log').mockImplementation(() => {}); // Suppress log messages
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Restore console.log after each test
    });
    it('should execute update query', async () => {
        //Given
        const bookId = 1;
        const bookName = 'Updated Book';
        const author = 'Author 1';
        const bookCategories = ['Category 1', 'Category 2'];
        const bookAuthors = ["Author 1"];
        const bookStatus = 'Will Read';
        const mockClient = { query: jest.fn().mockResolvedValue() };
        connectDb.mockResolvedValue(mockClient);
        //When
        const result = await executeUpdateBook(bookId,bookName,author,bookCategories,bookStatus,bookAuthors);
        //Then
        expect(mockClient.query).toHaveBeenCalledWith(
            `UPDATE books SET "name"=$1, description=$2, category=$3, status=$4, authors = $5 WHERE id=$6`,
            [bookName, author, expect.any(String), bookStatus,expect.any(String), bookId]
        );
        expect(result).toBe('Data Successfully updated');
        //Verify
        expect(connectDb).toHaveBeenCalledTimes(1);
        expect(mockClient.query).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledWith(mockClient);
    });
    it('should handle the db error', async () => {
        //Given
        const bookId = 1;
        const bookName = 'Updated Book';
        const author = 'Author 1';
        const bookCategories = ['Category 1', 'Category 2'];
        const bookStatus = 'Will Read';
        const bookAuthors = ["author 1"];
        const mockError = new Error('DB Connection Unsuccessful');
        const mockClient = { query: jest.fn().mockRejectedValue(mockError) };
        connectDb.mockResolvedValue(mockClient);
        //When
        await expect(executeUpdateBook(bookId,bookName,author,bookCategories,bookStatus,bookAuthors)).rejects.toThrow('Db Connection Unsuccessful');;
        //Then
        expect(mockClient.query).toHaveBeenCalledWith(
            `UPDATE books SET "name"=$1, description=$2, category=$3, status=$4, authors = $5 WHERE id=$6`,
            [bookName, author, expect.any(String), bookStatus, expect.any(String), bookId]
        );
        //Verify
        expect(connectDb).toHaveBeenCalledTimes(1);
        expect(mockClient.query).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledWith(mockClient);
    });
});
  