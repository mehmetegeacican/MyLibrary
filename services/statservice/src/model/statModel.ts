import {connectDb,closeDb} from "../dbconnection";

/**
 * gets the Author Counts
 * @returns All total number of books based on the author
 */
export const executeGetAuthorCounts = async () => {
    let client = await connectDb();
    let data;
    try{
        //Step 2 -- Get the Result
        const result = await client!.query('select author ,count(b.author) as total  from books b group by b."author" order by total desc;');
        data = result.rows;
        return data;
    }
    catch(e){
        console.log(e);
        throw new Error("Db Connection not established");
    }
    finally{
        await closeDb(client);
    }
}