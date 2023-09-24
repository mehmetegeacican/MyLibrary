const request = require('supertest');
const { isBook, insertDatasBooks, isAuthor, insertDatasAuthors, insertDatasCategories, isCategory } = require('../model/csvModel');
const { importCsvBooks, importCsvAuthors, importCsvCategories } = require('../controller/csvController');
const csvtojson = require('csvtojson');
const fs = require('fs');



//Step 1 -- Mock the executeGetAllBooks Function
jest.mock('../model/csvModel', () => ({
    isBook: jest.fn(),
    insertDatasBooks: jest.fn(),
    isAuthor: jest.fn(),
    insertDatasAuthors: jest.fn(),
    insertDatasCategories: jest.fn(),
    isCategory: jest.fn()
}));

jest.mock('csvtojson', () => {
    const mCsv = {
        on: jest.fn(),
        fromFile: jest.fn().mockReturnThis()
    };
    return jest.fn(() => mCsv);
});


jest.mock('fs', () => ({
    unlinkSync: jest.fn(),
}));
//Step 2 -- Mock Datas


//Step 3 -- Tests
describe('POST /api/v1/excel/import/books', () => {
    beforeEach(() => {
        // Reset the call count of the mock function before each test
        isBook.mockClear();
        insertDatasBooks.mockClear();
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Restore console.log after each test
    });
    it('Should successfully import books', async () => {

    });
    it('Should return 400 for empty csv file format', async () => {
        //Given
        const req = {
            file: {
                path: null, // Simulating CSV data not provided
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        //When
        await importCsvBooks(req, res);
        //Then
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'CSV data not provided.' });
        //Verify
    });
    it('Should return 400 for wrong csv file format', async () => {
        const req = {
            file: {
                path: 'filepath.csv',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Modify the mock to return incorrect data (not a book)
        jest.mock('csvtojson', () => ({
            fromFile: jest.fn().mockResolvedValue([
                { id: '1', name: 'Incorrect Data' },
            ]),
        }));

        await importCsvBooks(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'CSV data type not in the correct format.' });

    });
});

describe('POST /api/v1/excel/import/authors', () => {
    beforeEach(() => {
        // Reset the call count of the mock function before each test
        isAuthor.mockClear();
        insertDatasAuthors.mockClear();
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Restore console.log after each test
    });
    it('Should successfully import authors', async () => {

    });
    it('Should return 400 for empty csv file format', async () => {
        //Given
        const req = {
            file: {
                path: null, // Simulating CSV data not provided
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        //When
        await importCsvAuthors(req, res);
        //Then
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'CSV data not provided.' });
        //Verify
    });
    it('Should return 400 for wrong csv file format', async () => {
        const req = {
            file: {
                path: 'filepath.csv',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Modify the mock to return incorrect data (not a book)
        jest.mock('csvtojson', () => ({
            fromFile: jest.fn().mockResolvedValue([
                { id: '1', name: 'Incorrect Data' },
            ]),
        }));

        await importCsvAuthors(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'CSV data type not in the correct format.' });

    });
});

describe('POST /api/v1/excel/import/categories', () => {
    beforeEach(() => {
        // Reset the call count of the mock function before each test
        isCategory.mockClear();
        insertDatasCategories.mockClear();
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Restore console.log after each test
    });
    it('Should successfully import categories', async () => {

    });
    it('Should return 400 for empty csv file format', async () => {
        //Given
        const req = {
            file: {
                path: null, // Simulating CSV data not provided
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        //When
        await importCsvCategories(req, res);
        //Then
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'CSV data not provided.' });
        //Verify
    });
    it('Should return 400 for wrong csv file format', async () => {
        const req = {
            file: {
                path: 'filepath.csv',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Modify the mock to return incorrect data (not a book)
        jest.mock('csvtojson', () => ({
            fromFile: jest.fn().mockResolvedValue([
                { id: '1', name: 'Incorrect Data' },
            ]),
        }));

        await importCsvCategories(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'CSV data type not in the correct format.' });

    });
});