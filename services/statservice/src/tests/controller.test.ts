import request from 'supertest';
import app from '../app';
import {
    executeGetAuthorCounts as executeGetAuthorCountsMock
} from '../model/statModel';


//Step 1 -- Mock Variables
const mockStatByAuthor = [
    { name:"Author 1", count: 3},
    { name:"Author 2", count: 2},
    { name:"Author 3", count: 1},
];

// Step 2 -- Mock Functions 
jest.mock('../model/statModel', () => ({
    executeGetAuthorCounts: jest.fn(),
}));

/**
 * Mock Versions of Functions
 */
const executeGetAuthorCounts = executeGetAuthorCountsMock as jest.Mock; // Cast to jest.Mock



describe('GET --> /api/v1/stats/all', () => {
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
        const response = await request(app).get('/api/V1/stats/all');
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
        const response = await request(app).get('/api/V1/stats/all');
        //Then
        expect(response.status).toBe(500);
        expect(response.body).toEqual({error:err});
        //Verify
        expect(executeGetAuthorCounts).toHaveBeenCalledTimes(1);
    })
});