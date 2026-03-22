const request = require('supertest');
const app = require('../app');
const { addNewUser, checkIfUserExists, getIdOfUser, getUserById, updateUserPasswordById } = require('../model/authModel');
const {
    comparePasswords
} = require('../utils/utils');

//Step 1 -- Mock the executeGetAllBooks Function
jest.mock('../model/authModel', () => ({
    addNewUser: jest.fn(),
    checkIfUserExists: jest.fn(),
    getIdOfUser: jest.fn(),
    getUserById: jest.fn(),
    updateUserPasswordById: jest.fn(),
}));

jest.mock('../utils/utils', () => ({
    comparePasswords: jest.fn()
}))

//Step 2 -- Mock the Datas
const mockBookEmail = "test@testmail.com"
const mockBookPassword = "123456"

const mockUser = [
    { id: 1, username: "test@testmail.com", password: "123456" }
]

const mockInvalidPassword = "123456";
const mockValidPassword = "Q1w2e3r4*";
const mockValidPasswordNew = "Q1w2e3r4*New";

//Step 3 -- Test Scenarios
describe('POST -> /api/v1/auth/signup', () => {
    beforeEach(() => {
        // Reset the call count of the mock function before each test
        addNewUser.mockClear();
        checkIfUserExists.mockClear();
        getIdOfUser.mockClear();
        jest.spyOn(console, 'log').mockImplementation(() => { }); // Suppress log messages
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Restore console.log after each test
    });
    it('Should successfully insert a new user', async () => {
        //Given
        // Another Function needed for retrieving the id
        checkIfUserExists.mockResolvedValue(false);
        getIdOfUser.mockResolvedValue([{ id: 1 }]);
        addNewUser.mockResolvedValue({ message: "Data successfully inserted" });
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


describe('POST --> /api/v1/auth/login', () => {
    beforeEach(() => {
        // Reset the call count of the mock function before each test
        checkIfUserExists.mockClear();
        getIdOfUser.mockClear();
        jest.spyOn(console, 'log').mockImplementation(() => { }); // Suppress log messages
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Restore console.log after each test
    });
    it('Should successfully login', async () => {
        //Given
        checkIfUserExists.mockResolvedValue(true);
        getIdOfUser.mockResolvedValue([{ id: 1 }]);
        //When
        const response = await request(app).post('/api/v1/auth/login').send({ email: 'test@example.com', password: 'password123' });
        //Then
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('email', 'test@example.com');
        expect(response.body).toHaveProperty('token');
        //Verify
        expect(checkIfUserExists).toHaveBeenCalledTimes(1);
        expect(getIdOfUser).toHaveBeenCalledTimes(1);
    });
    it('Should not login to an unexisting user', async () => {
        //Given
        checkIfUserExists.mockResolvedValue(false);
        //When
        const response = await request(app).post('/api/v1/auth/login').send({ email: 'test@example.com', password: 'password123' });
        //Then
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: "The user does not exist" });
        //Verify
        expect(checkIfUserExists).toHaveBeenCalledTimes(1);
        expect(getIdOfUser).toHaveBeenCalledTimes(0);
    });
    it('Should give 500 error for the case of an internal server error', async () => {
        //Given
        const mockError = 'Internal Server Error';
        checkIfUserExists.mockRejectedValue(mockError);
        //When
        const response = await request(app).post('/api/v1/auth/login').send({ email: 'test@example.com', password: 'password123' });
        //Then
        expect(response.status).toBe(500);
        expect(response.body.error).toBe("Internal Server Error");
        //Verify
        expect(checkIfUserExists).toHaveBeenCalledTimes(1);
    });
});

describe('Password Validation Middleware', () => {

    it('Should return 400 and all error messages for a "weak" password', async () => {
        // Given
        const weakPassword = "abc";

        // When
        const response = await request(app)
            .put('/api/v1/auth/change-password/1')
            .send({
                oldPassword: 'ValidOldPassword123!',
                newPassword: weakPassword
            });

        // Then
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');

        // Map the messages to an array for easier assertion
        const errorMessages = response.body.errors.map(err => err.msg);

        expect(errorMessages).toContain('Password must be at least 8 characters long');
        //expect(errorMessages).toContain('Password must contain at least one lowercase letter');
        expect(errorMessages).toContain('Password must contain at least one uppercase letter');
        expect(errorMessages).toContain('Password must contain at least one number');
        expect(errorMessages).toContain('Password must contain at least one special character');
    });

    it('Should return 400 if the newPassword field is completely missing', async () => {
        const response = await request(app)
            .put('/api/v1/auth/change-password/1')
            .send({ oldPassword: 'ValidOldPassword123!' });

        expect(response.status).toBe(400);
        // express-validator usually triggers the length or existence rule here
        expect(response.body.errors.length).toBeGreaterThan(0);
    });

    it('Should PASS validation when the password meets all criteria', async () => {
        // We mock the controller dependencies because we only care about passing the validator
        getUserById.mockResolvedValue([{ id: 1, password: 'hashed' }]);
        comparePasswords.mockResolvedValue(true);
        updateUserPasswordById.mockResolvedValue("Success");

        const response = await request(app)
            .put('/api/v1/auth/change-password/1')
            .send({
                oldPassword: 'ValidOldPassword123!',
                newPassword: 'StrongPassword123!' // Meets all requirements
            });

        // If it passes the validator, it reaches the controller (which returns 200)
        expect(response.status).toBe(200);
        expect(response.body).not.toHaveProperty('errors');
    });
});


describe('PUT --> /api/v1/auth/change-password/:userId', () => {
    beforeEach(() => {
        // Reset all mocks defined in your repository/utils
        getUserById.mockClear();
        updateUserPasswordById.mockClear();
        comparePasswords.mockClear();
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    // it('Should return 400 if required fields are missing', async () => {
    //     // When: sending only one password
    //     const response = await request(app)
    //         .put('/api/v1/auth/change-password/1')
    //         .send({ oldPassword: 'password123' });

    //     // Then
    //     expect(response.status).toBe(400);
    //     expect(response.body.message).toBe("Missing required fields.");
    // });
    it('Should successfully update the password, 200', async () => {
        // Given
        getUserById.mockResolvedValue([{ id: 1, password: 'hashed_old_password' }]);
        comparePasswords.mockResolvedValue(true);
        updateUserPasswordById.mockResolvedValue("Password successfully updated");

        // When
        const response = await request(app)
            .put('/api/v1/auth/change-password/1')
            .send({ oldPassword: 'correct_old', newPassword: 'NewSecurePass1!' });

        // Then
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Password successfully updated");

        // Verify update was called with a hashed password (it shouldn't be 'NewSecurePass1!')
        expect(updateUserPasswordById).toHaveBeenCalledWith("1", expect.not.stringMatching('NewSecurePass1!'));
    });
    it('Should return 400 if the old password does not match', async () => {
        // Given
        getUserById.mockResolvedValue([{ id: 1, password: mockValidPassword }]);
        comparePasswords.mockResolvedValue(false); // Simulating password mismatch

        // When
        const response = await request(app)
            .put('/api/v1/auth/change-password/1')
            .send({ oldPassword: mockValidPassword, newPassword: mockValidPasswordNew });

        // Then
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid current password.");
    });
    it('Should return 404 if the user does not exist', async () => {
        // Given
        getUserById.mockResolvedValue([]);

        // When
        const response = await request(app)
            .put('/api/v1/auth/change-password/999')
            .send({ oldPassword: mockValidPassword, newPassword: mockValidPasswordNew });

        // Then
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("User not found.");
    });
    it('Should return 500 if a database error occurs', async () => {
        // Given
        getUserById.mockRejectedValue(new Error("DB Down"));

        // When
        const response = await request(app)
            .put('/api/v1/auth/change-password/1')
            .send({ oldPassword: mockValidPassword, newPassword: mockValidPasswordNew });

        // Then
        expect(response.status).toBe(500);
        expect(response.body.message).toBe("Internal server error.");
    });
});
