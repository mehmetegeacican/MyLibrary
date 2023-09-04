const request = require('supertest');
const app = require('../app');
const { addNewUser, checkIfUserExists , getIdOfUser} = require('../model/authModel');


//Step 1 -- Mock the executeGetAllBooks Function
jest.mock('../model/authModel', () => ({
    addNewUser: jest.fn(),
    checkIfUserExists: jest.fn(),
    getIdOfUser: jest.fn()
}));

//Step 2 -- Mock the Datas
const mockBookEmail = "test@testmail.com"
const mockBookPassword = "123456"

const mockUser = [
    { id: 1, username: "test@testmail.com", password: "123456" }
]

//Step 3 -- Test Scenarios
describe('POST -> /api/v1/auth/signup', () => {
    beforeEach(() => {
        // Reset the call count of the mock function before each test
        addNewUser.mockClear();
        checkIfUserExists.mockClear();
        jest.spyOn(console, 'log').mockImplementation(() => { }); // Suppress log messages
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Restore console.log after each test
    });
    it('Should successfully insert a new user', async () => {
        //Given
        // Another Function needed for retrieving the id
        checkIfUserExists.mockResolvedValue(false);
        getIdOfUser.mockResolvedValue([{id:1}]);
        addNewUser.mockResolvedValue({message: "Data successfully inserted"});
        //When
        const response = await request(app).post('/api/v1/auth/signup').send({ email: 'test@example.com', password: 'password123' });
        //Then
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('result');
        expect(response.body).toHaveProperty('email', 'test@example.com');
        expect(response.body).toHaveProperty('token');
        //Verify
        expect(checkIfUserExists).toHaveBeenCalledTimes(1);
        expect(addNewUser).toHaveBeenCalledTimes(1);
    });
    it('Should not insert a user if there is one with the same username already existing', async () => {
        //Given
        checkIfUserExists.mockResolvedValue(true);
        //When
        const response = await request(app).post('/api/v1/auth/signup').send({ email: 'test@example.com', password: 'password123' });
        //Then
        expect(response.status).toBe(400);
        //Verify
        expect(checkIfUserExists).toHaveBeenCalledTimes(1);
    });
    it('should return 500 for the case of an internal server error', async () => {
        //Given
        const mockError = 'Db Access Unsuccessful';
        checkIfUserExists.mockRejectedValue(mockError);
        //When
        const response = await request(app).post('/api/v1/auth/signup').send({ email: 'test@example.com', password: 'password123' });
        //Then
        expect(response.status).toBe(500);
        expect(response.body.error).toBe("Db Connection unsuccessful");
        //Verify
        expect(checkIfUserExists).toHaveBeenCalledTimes(1);
    });
});