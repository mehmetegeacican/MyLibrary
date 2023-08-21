import  {connectDb as connectDbMock, closeDb as closeDbMock} from '../dbconnection';

//Mock the ConnectDb & CloseDb
jest.mock('../dbconnection', () => ({
    connectDb: jest.fn(),
    closeDb: jest.fn(),
}));

const connectDb = connectDbMock as jest.Mock; // Cast to jest.Mock
const closeDb = closeDbMock as jest.Mock; // Cast to jest.Mock


describe('executeGetAuthorCounts', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
        jest.spyOn(console, 'log').mockImplementation(() => { }); // Suppress log messages
    });
    afterEach(() => {
        jest.restoreAllMocks(); // Restore console.log after each test
    });
    it('should retrieve the stats from the db',async () => {
        
    });
    it('Should handle db error', async () => {

    });
});