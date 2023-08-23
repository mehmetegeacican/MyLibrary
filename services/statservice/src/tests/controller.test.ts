import request from 'supertest';
import app from '../app';
import {
    executeGetAuthorCounts as executeGetAuthorCountsMock,
    executeGetCategoryCounts as executeGetCategoryCountsMock,
    executeGetStatusCounts as executeGetStatusCountsMock
} from '../model/statModel';


//Step 1 -- Mock Variables
const mockStatByAuthor = [
    { name:"Author 1", count: 3},
    { name:"Author 2", count: 2},
    { name:"Author 3", count: 1},
];

const mockStatByCategory = [
    { name:"Category 1", count: 3},
    { name:"Category 2", count: 2},
    { name:"Category 3", count: 1},
]

const mockStatByStatus = [
    { name:"Red", count: 3},
    { name:"Reading", count: 2},
    { name:"Will Read", count: 1},
]

// Step 2 -- Mock Functions 
jest.mock('../model/statModel', () => ({
    executeGetAuthorCounts: jest.fn(),
    executeGetCategoryCounts : jest.fn(),
    executeGetStatusCounts: jest.fn()
}));

/**
 * Mock Versions of Functions
 */
const executeGetAuthorCounts = executeGetAuthorCountsMock as jest.Mock; // Cast to jest.Mock
const executeGetCategoryCounts = executeGetCategoryCountsMock as jest.Mock;
const executeGetStatusCounts = executeGetStatusCountsMock as jest.Mock;



describe('GET --> /api/v1/stats/all/authors', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
        jest.spyOn(console, 'log').mockImplementation(() => { }); // Suppress log messages
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Restore console.log after each test
    });
    it('Should successfully retrieve all the datas', async () => {
        //Given
        executeGetAuthorCounts.mockResolvedValue(mockStatByAuthor);
        //When
        const response = await request(app).get('/api/V1/stats/all/authors');
        //Then
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockStatByAuthor);
        //Verify
        expect(executeGetAuthorCounts).toHaveBeenCalledTimes(1);
    });
    it('Should give a db error in case of connection failure',async () => {
        //Given
        const err = "Db Connection not established";
        executeGetAuthorCounts.mockRejectedValue(err);
        //When
        const response = await request(app).get('/api/V1/stats/all/authors');
        //Then
        expect(response.status).toBe(500);
        expect(response.body).toEqual({error:err});
        //Verify
        expect(executeGetAuthorCounts).toHaveBeenCalledTimes(1);
    })
});

describe('GET --> /api/v1/stats/all/categories', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
        jest.spyOn(console, 'log').mockImplementation(() => { }); // Suppress log messages
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Restore console.log after each test
    });
    it('Should successfully retrieve all the datas', async () => {
        //Given
        executeGetCategoryCounts.mockResolvedValue(mockStatByCategory);
        //When
        const response = await request(app).get('/api/V1/stats/all/categories');
        //Then
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockStatByCategory);
        //Verify
        expect(executeGetCategoryCounts).toHaveBeenCalledTimes(1);
    });
    it('Should give a db error in case of connection failure',async () => {
        //Given
        const err = "Db Connection not established";
        executeGetCategoryCounts.mockRejectedValue(err);
        //When
        const response = await request(app).get('/api/V1/stats/all/categories');
        //Then
        expect(response.status).toBe(500);
        expect(response.body).toEqual({error:err});
        //Verify
        expect(executeGetCategoryCounts).toHaveBeenCalledTimes(1);
    })
});

describe('GET --> /api/v1/stats/all/statuses', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
        jest.spyOn(console, 'log').mockImplementation(() => { }); // Suppress log messages
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Restore console.log after each test
    });
    it('Should successfully retrieve all the statuses', async () => {
        //Given
        executeGetStatusCounts.mockResolvedValue(mockStatByStatus);
        //When
        const response = await request(app).get('/api/V1/stats/all/statuses');
        //Then
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockStatByStatus);
        //Verify
        expect(executeGetStatusCounts).toHaveBeenCalledTimes(1);
    });
    it('Should give a db error in case of connection failure',async () => {
        //Given
        const err = "Db Connection not established";
        executeGetStatusCounts.mockRejectedValue(err);
        //When
        const response = await request(app).get('/api/V1/stats/all/statuses');
        //Then
        expect(response.status).toBe(500);
        expect(response.body).toEqual({error:err});
        //Verify
        expect(executeGetStatusCounts).toHaveBeenCalledTimes(1);
    })
});