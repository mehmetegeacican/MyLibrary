const dotenv = require("dotenv");
const { Pool } = require("pg");
dotenv.config();

//Connect to Postgres
const connectDb = async () => {
    try {
        const pool = new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT,
        });
        const client = await pool.connect();
        console.log("Database Connection established");
        return client;
    } catch (error) {
        console.log(error)
    }
}

//Close the Db Connection
const closeDb = async (client) => {
    try{
        await client.release();
        await client.end();
        console.log("Db Connection closed");
    }
    catch(e){
        console.log(e);
    }
}

module.exports = {
    connectDb,
    closeDb
}