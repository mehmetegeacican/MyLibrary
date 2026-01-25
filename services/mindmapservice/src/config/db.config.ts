import mongoose from "mongoose";

/**
 * Connect to MongoDB using Mongoose
 * @param mongoURI the MongoDB connection string
 * @returns {*boolean} true if connection is successful, false otherwise
 */
export const connectToMongoDb = async (mongoURI: string) : Promise<boolean> => {
    try{
        const connection = await mongoose.connect(mongoURI);
        console.log("MongoDB Connected:", connection.connection.host);
        return true;
    } catch(error:any){
        console.error("MongoDB Connection Error:",error.message);
        process.exit(1);
        return false;
    }
}

/**
 * Disconnect from MongoDB
 */
export const disconnectFroMongoDb = async () => {
    try {
        await mongoose.disconnect();
        console.log("MongoDB Disconnected");
    } catch (error:any){
        console.error('Error disconnecting from MongoDB:', error.message);
    }
}