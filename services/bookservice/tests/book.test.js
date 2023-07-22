const { executeGetAllBooks } = require('../model/book');
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

describe('executeGetAllBooks', () => {
    beforeEach(() => {
        // Reset the call count of the mock function before each test
        connectDb.mockClear();
        closeDb.mockClear();
    });

    it('should retrieve all the books from the db', async () => {
        const mockQueryResult = { rows: mockBooksData };
        const mockClient = { query: jest.fn().mockResolvedValue(mockQueryResult) };
        // Mock the database connection function to return the client
        connectDb.mockResolvedValue(mockClient);
        // Call the function
        const result = await executeGetAllBooks();
        //Expectations
        expect(mockClient.query).toHaveBeenCalledWith('SELECT * FROM books');
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