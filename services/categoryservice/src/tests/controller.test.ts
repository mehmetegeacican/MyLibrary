import request from 'supertest';
import app from '../app';
import { getAll as getAllMock, checkCategoryAlreadyExists as checkCategoryAlreadyExistsMock, addNewCategory as addNewCategoryMock, checkCategoryAlreadyExistsByID as checkCategoryAlreadyExistsByIDMock, deleteCategory as deleteCategoryMock, updateCategory as updateCategoryMock } from '../models/categoryModel';

//Step 1 -- Mock Variables
const mockCategories = [
    { id: 1, name: "Category 1", info: "Category info", userId:1 }
];

// Step 2 -- Mock Functions 
jest.mock('../models/categoryModel', () => ({
    getAll: jest.fn(),
    checkCategoryAlreadyExists: jest.fn(),
    addNewCategory: jest.fn(),
    checkCategoryAlreadyExistsByID: jest.fn(),
    deleteCategory: jest.fn(),
    updateCategory: jest.fn()
}));
/**
 * Mock Versions of Functions
 */
const getAll = getAllMock as jest.Mock; // Cast to jest.Mock
const checkCategoryAlreadyExists = checkCategoryAlreadyExistsMock as jest.Mock;
const addNewCategory = addNewCategoryMock as jest.Mock;
const checkCategoryAlreadyExistsByID = checkCategoryAlreadyExistsByIDMock as jest.Mock;
const deleteCategory = deleteCategoryMock as jest.Mock;
const updateCategory = updateCategoryMock as jest.Mock;

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
        const response = await request(app).get('/api/v1/categories/all/1');
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
        const response = await request(app).get('/api/v1/categories/all/1');
        //Then
        expect(response.status).toBe(500);
        expect(response.body.error).toEqual(err);
        //Verify
        expect(getAll).toHaveBeenCalledTimes(1);
    });
});

describe('POST --> /api/v1/categories', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
        jest.spyOn(console, 'log').mockImplementation(() => { }); // Suppress log messages
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Restore console.log after each test
    });
    it('Should successfully add a new category', async () => {
        //Given
        checkCategoryAlreadyExists.mockResolvedValue(null);
        addNewCategory.mockResolvedValue({ data: mockCategories[0], message: "Data successfully inserted" });
        //When
        const response = await request(app).post('/api/v1/categories').send(mockCategories[0]);
        //Then
        expect(response.status).toBe(201);
        expect(response.body.data.message).toEqual("Data successfully inserted");
        expect(response.body.data.data).toEqual(mockCategories[0]);
        //Verify
        expect(addNewCategory).toHaveBeenCalledTimes(1);
        expect(checkCategoryAlreadyExists).toHaveBeenCalledTimes(1);
    });
    it('Should give a 500 error if the db connection is lost', async () => {
        //Given
        const err = "Db Connection not established";
        checkCategoryAlreadyExists.mockRejectedValue(new Error(err));
        //When
        const response = await request(app).post('/api/v1/categories').send(mockCategories[0]);
        //Then
        expect(response.status).toBe(500);
        expect(response.body.error).toEqual(err);
        //Verify
        expect(checkCategoryAlreadyExists).toHaveBeenCalledTimes(1);
        expect(addNewCategory).toHaveBeenCalledTimes(0);
    });
    it('Should give a 400 Error if the name field is empty', async () => {
        //Given
        const reqBody = {
            id: 1,
            name: null,
            info: "Test info"
        }
        //When
        const response = await request(app).post('/api/v1/categories').send(reqBody);
        //Then
        expect(response.status).toBe(400);
        expect(response.body.errors[0].msg).toEqual("Name is required");
        //Verify
        expect(checkCategoryAlreadyExists).toHaveBeenCalledTimes(0);
        expect(addNewCategory).toHaveBeenCalledTimes(0);
    });
    it('Should give a 400 Error if the name field is not string', async () => {
        //Given
        const reqBody = {
            id: 1,
            name: 2,
            info: "Test info"
        }
        //When
        const response = await request(app).post('/api/v1/categories').send(reqBody);
        //Then
        expect(response.status).toBe(400);
        expect(response.body.errors[0].msg).toEqual("Name should be a string");
        //Verify
        expect(checkCategoryAlreadyExists).toHaveBeenCalledTimes(0);
        expect(addNewCategory).toHaveBeenCalledTimes(0);
    });
    it('Should give a 400 Error if the info field is not string', async () => {
        //Given
        const reqBody = {
            id: 1,
            name: "Test name",
            info: null
        }
        //When
        const response = await request(app).post('/api/v1/categories').send(reqBody);
        //Then
        expect(response.status).toBe(400);
        expect(response.body.errors[0].msg).toEqual("Info should be a string");
        //Verify
        expect(checkCategoryAlreadyExists).toHaveBeenCalledTimes(0);
        expect(addNewCategory).toHaveBeenCalledTimes(0);
    });
    it('Should give a 400 if there is already a category with the same name', async () => {
        //Given
        checkCategoryAlreadyExists.mockResolvedValue(mockCategories[0]);
        //When
        const response = await request(app).post('/api/v1/categories').send(mockCategories[0]);
        //Then
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "Category Already Exists!" });
        //Verify
        expect(checkCategoryAlreadyExists).toHaveBeenCalledTimes(1);
        expect(addNewCategory).toHaveBeenCalledTimes(0);
    });
});

describe('DELETE --> /api/v1/categories', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
        jest.spyOn(console, 'log').mockImplementation(() => { }); // Suppress log messages
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Restore console.log after each test
    });
    it('Should successfully delete a category', async () => {
        //Given
        checkCategoryAlreadyExistsByID.mockResolvedValue(mockCategories[0]);
        deleteCategory.mockResolvedValue({ data: mockCategories[0], message: "Category deleted successfully" })
        //When
        const response = await request(app).delete('/api/v1/categories/1');
        //Then
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("Category deleted successfully");
        expect(response.body.data.data).toEqual(mockCategories[0]);
        //Verify
        expect(checkCategoryAlreadyExistsByID).toHaveBeenCalledTimes(1);
        expect(deleteCategory).toHaveBeenCalledTimes(1);
    });
    it('Should give 400 if the id param is not correct', async () => {
        //Given
        //When
        const response = await request(app).delete('/api/v1/categories/asd');
        //Then
        expect(response.status).toBe(400);
        expect(response.body.errors[0].msg).toEqual("ID should be declared as integer");
        //Verify
        expect(checkCategoryAlreadyExistsByID).toHaveBeenCalledTimes(0);
        expect(deleteCategory).toHaveBeenCalledTimes(0);
    });
    it('Should give 500 for an db connection error', async () => {
        //Given
        const err = "Db Connection not established";
        checkCategoryAlreadyExistsByID.mockRejectedValue(new Error(err));
        //When
        const response = await request(app).delete('/api/v1/categories/1');
        //Then
        expect(response.status).toBe(500);
        expect(response.body.error).toEqual(err);
        //Verify
        expect(checkCategoryAlreadyExistsByID).toHaveBeenCalledTimes(1);
        expect(deleteCategory).toHaveBeenCalledTimes(0);
    });
    it('Should give 400 for trying to delete a nonexistent id', async () => {
        //Given
        checkCategoryAlreadyExistsByID.mockResolvedValue(null);
        //When
        const response = await request(app).delete('/api/v1/categories/1');
        //Then
        expect(response.status).toBe(400);
        expect(response.body.error).toEqual("The Following ID does not exist!");
        //Verify
        expect(checkCategoryAlreadyExistsByID).toHaveBeenCalledTimes(1);
        expect(deleteCategory).toHaveBeenCalledTimes(0);
    });
});

describe('PUT --> api/v1/categories', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
        jest.spyOn(console, 'log').mockImplementation(() => { }); // Suppress log messages
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Restore console.log after each test
    });
    it('Should successfully update the category', async () => {
        //Given
        checkCategoryAlreadyExistsByID.mockResolvedValue(mockCategories[0]);
        updateCategory.mockResolvedValue({ data: mockCategories[0], message: "Category updated successfully" });
        //When
        const response = await request(app).put('/api/v1/categories/1').send(mockCategories[0]);
        //Then
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("Category updated successfully");
        expect(response.body.data.data).toEqual(mockCategories[0]);
        //Verify
        expect(checkCategoryAlreadyExistsByID).toHaveBeenCalledTimes(1);
        expect(updateCategory).toHaveBeenCalledTimes(1);
    });
    it('Should give an Internal server error due to db connection problem', async () => {
        //Given
        const err = "Db Connection not established";
        checkCategoryAlreadyExistsByID.mockRejectedValue(new Error(err));
        //When
        const response = await request(app).put('/api/v1/categories/1').send(mockCategories[0]);
        //Then
        expect(response.status).toBe(500);
        expect(response.body.error).toEqual(err);
        //Verify
        expect(checkCategoryAlreadyExistsByID).toHaveBeenCalledTimes(1);
        expect(deleteCategory).toHaveBeenCalledTimes(0);
    });
    it('Should give 400 for non proper id', async () => {
        //Given
        //When
        const response = await request(app).put('/api/v1/categories/asd').send(mockCategories[0]);
        //Then
        expect(response.status).toBe(400);
        expect(response.body.errors[0].msg).toEqual("ID should be declared as integer");
        //Verify
        expect(checkCategoryAlreadyExistsByID).toHaveBeenCalledTimes(0);
        expect(deleteCategory).toHaveBeenCalledTimes(0);
    });
    it('Should give 400 for null name', async () => {
        //Given
        const reqBody = {
            name: null,
            info: "Test info"
        }
        //When
        const response = await request(app).put('/api/v1/categories/1').send(reqBody);
        //Then
        expect(response.status).toBe(400);
        expect(response.body.errors[0].msg).toEqual("Name is required");
        //Verify
        expect(checkCategoryAlreadyExistsByID).toHaveBeenCalledTimes(0);
        expect(deleteCategory).toHaveBeenCalledTimes(0);
    });
    it('Should give 400 for non string name', async () => {
        //Given
        const reqBody = {
            name: 1123,
            info: "Test info"
        }
        //When
        const response = await request(app).put('/api/v1/categories/1').send(reqBody);
        //Then
        expect(response.status).toBe(400);
        expect(response.body.errors[0].msg).toEqual("Name should be a string");
        //Verify
        expect(checkCategoryAlreadyExistsByID).toHaveBeenCalledTimes(0);
        expect(deleteCategory).toHaveBeenCalledTimes(0);
    });
    it('Should give 400 for non string info', async () => {
        //Given
        const reqBody = {
            name: "Test name",
            info: 123
        }
        //When
        const response = await request(app).put('/api/v1/categories/1').send(reqBody);
        //Then
        expect(response.status).toBe(400);
        expect(response.body.errors[0].msg).toEqual("Info should be a string");
        //Verify
        expect(checkCategoryAlreadyExistsByID).toHaveBeenCalledTimes(0);
        expect(deleteCategory).toHaveBeenCalledTimes(0);
    });
    it('Should give 400 for trying to update a non existent id', async () => {
        //Given
        checkCategoryAlreadyExistsByID.mockResolvedValue(null);
        //When
        const response = await request(app).put('/api/v1/categories/1').send(mockCategories[0]);
        //Then
        expect(response.status).toBe(400);
        expect(response.body.error).toEqual("The Following ID does not exist!");
        //Verify
        expect(checkCategoryAlreadyExistsByID).toHaveBeenCalledTimes(1);
        expect(deleteCategory).toHaveBeenCalledTimes(0);
    });
});