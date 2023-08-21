import dotenv from 'dotenv';
import { Pool } from "pg";
dotenv.config();

//Connect to Postgres
export const connectDb = async () => {
    try {
        const pool = new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: parseInt(process.env.PGPORT!),
        });
        const client = await pool.connect();
        console.log("Database Connection established");
        return client;
    } catch (error) {
        console.log(error)
    }
}

//Close the Db Connection
export const closeDb = async (client: any) => {
    try{
        await client.release();
        await client.end();
        console.log("Db Connection closed");
    }
    catch(e){
        console.log(e);
    }
}
