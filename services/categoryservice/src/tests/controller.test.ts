import request from 'supertest';
import app from '../app';
import { getAll as getAllMock } from '../models/categoryModel';

//Step 1 -- Mock Variables
const mockCategories = [
    {id:1,name:"Category 1"}
];

// Step 2 -- Mock Functions 
jest.mock('../models/categoryModel', () => ({
    getAll: jest.fn()
}));

const getAll = getAllMock as jest.Mock; // Cast to jest.Mock

describe('GET --> /api/v1/categories/all', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
        jest.spyOn(console, 'log').mockImplementation(() => { }); // Suppress log messages
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Restore console.log after each test
    });
    it('should retrieve all of the categories', async () => {
        //Given
        getAll.mockResolvedValue(mockCategories);
        //When
        const response = await request(app).get('/api/v1/categories/all');
        //Then
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCategories);
        // Verify
        expect(getAll).toHaveBeenCalledTimes(1);
    });
    it('should return a db connection err', async () => {
        //Given
        const err = "Db Connection not established";
        getAll.mockRejectedValue(new Error(err));
        //When
        const response = await request(app).get('/api/v1/categories/all');
        //Then
        expect(response.status).toBe(500);
        expect(response.body.error).toEqual(err);
        //Verify
        expect(getAll).toHaveBeenCalledTimes(1);
    });
});