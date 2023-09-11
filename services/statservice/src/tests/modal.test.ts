import  {connectDb as connectDbMock, closeDb as closeDbMock} from '../dbconnection';
import { executeGetAuthorCounts, executeGetCategoryCounts, executeGetStatusCounts } from '../model/statModel';

//Mock the ConnectDb & CloseDb
jest.mock('../dbconnection', () => ({
    connectDb: jest.fn(),
    closeDb: jest.fn(),
}));

const connectDb = connectDbMock as jest.Mock; // Cast to jest.Mock
const closeDb = closeDbMock as jest.Mock; // Cast to jest.Mock

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

describe('executeGetAuthorCounts', () => {
    beforeEach(async () => {
        connectDb.mockClear();
        closeDb.mockClear();
        jest.spyOn(console, 'log').mockImplementation(() => { }); // Suppress log messages
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Restore console.log after each test
    });
    it('should retrieve the stats from the db',async () => {
        //Given
        const mockQueryResult = { rows: mockStatByAuthor };
        const mockClient = { query: jest.fn().mockResolvedValue(mockQueryResult) };
        connectDb.mockResolvedValue(mockClient);
       
        //When
        const result = await executeGetAuthorCounts(1);
        //Then
        expect(mockClient.query).toHaveBeenCalledWith('SELECT c.author_name, COUNT(*) AS author_count FROM books b CROSS JOIN LATERAL unnest(b.authors) AS c(author_name) WHERE b.user_id = 1 GROUP BY c.author_name ORDER BY author_count DESC;');
        expect(result).toEqual(mockStatByAuthor);
        expect(closeDb).toHaveBeenCalledWith(mockClient);
        //Verify
        expect(connectDb).toHaveBeenCalledTimes(1);
        expect(mockClient.query).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledTimes(1);

    });
    it('Should handle db error', async () => {
        // Given
        const mockClient = { query: jest.fn() };
        connectDb.mockResolvedValue(mockClient);
        closeDb.mockResolvedValue; // Assume closeDb resolves successfully
        mockClient.query.mockRejectedValue('DB Error');

        // When & Then
        await expect(executeGetAuthorCounts(1)).rejects.toThrow('Db Connection not established');

        // Verify
        expect(connectDb).toHaveBeenCalledTimes(1);
        expect(mockClient.query).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledWith(mockClient);
    });
});

describe('executeGetCategoryCounts', () => {
    beforeEach(async () => {
        connectDb.mockClear();
        closeDb.mockClear();
        jest.spyOn(console, 'log').mockImplementation(() => { }); // Suppress log messages
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Restore console.log after each test
    });
    it('should retrieve the stats from the db',async () => {
        //Given
        const mockQueryResult = { rows: mockStatByCategory };
        const mockClient = { query: jest.fn().mockResolvedValue(mockQueryResult) };
        connectDb.mockResolvedValue(mockClient);
       
        //When
        const result = await executeGetCategoryCounts(1);
        //Then
        //expect(mockClient.query).toHaveBeenCalledWith('select author ,count(b.author) as total  from books b group by b."author" order by total desc;');
        expect(result).toEqual(mockStatByCategory);
        expect(closeDb).toHaveBeenCalledWith(mockClient);
        //Verify
        expect(connectDb).toHaveBeenCalledTimes(1);
        expect(mockClient.query).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledTimes(1);

    });
    it('Should handle db error', async () => {
        // Given
        const mockClient = { query: jest.fn() };
        connectDb.mockResolvedValue(mockClient);
        closeDb.mockResolvedValue; // Assume closeDb resolves successfully
        mockClient.query.mockRejectedValue('DB Error');

        // When & Then
        await expect(executeGetCategoryCounts(1)).rejects.toThrow('Db Connection not established');

        // Verify
        expect(connectDb).toHaveBeenCalledTimes(1);
        expect(mockClient.query).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledWith(mockClient);
    });
});

describe('executeGetStatusCounts', () => {
    beforeEach(async () => {
        connectDb.mockClear();
        closeDb.mockClear();
        jest.spyOn(console, 'log').mockImplementation(() => { }); // Suppress log messages
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Restore console.log after each test
    });
    it('should retrieve the stats from the db',async () => {
        //Given
        const mockQueryResult = { rows: mockStatByStatus };
        const mockClient = { query: jest.fn().mockResolvedValue(mockQueryResult) };
        connectDb.mockResolvedValue(mockClient);
       
        //When
        const result = await executeGetStatusCounts(1);
        //Then
        expect(mockClient.query).toHaveBeenCalledWith('select b.status ,count(b.status) as total  from books b where user_id = 1 group by b.\"status\" order by total  desc;');
        expect(result).toEqual(mockStatByStatus);
        expect(closeDb).toHaveBeenCalledWith(mockClient);
        //Verify
        expect(connectDb).toHaveBeenCalledTimes(1);
        expect(mockClient.query).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledTimes(1);

    });
    it('Should handle db error', async () => {
        // Given
        const mockClient = { query: jest.fn() };
        connectDb.mockResolvedValue(mockClient);
        closeDb.mockResolvedValue; // Assume closeDb resolves successfully
        mockClient.query.mockRejectedValue('DB Error');

        // When & Then
        await expect(executeGetStatusCounts(1)).rejects.toThrow('Db Connection not established');

        // Verify
        expect(connectDb).toHaveBeenCalledTimes(1);
        expect(mockClient.query).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledTimes(1);
        expect(closeDb).toHaveBeenCalledWith(mockClient);
    });
});