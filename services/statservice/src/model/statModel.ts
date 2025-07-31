import { connectDb, closeDb } from "../dbconnection";

/**
 * gets the Author Counts
 * @returns All total number of books based on the author
 */
export const executeGetAuthorCounts = async (userId: number) => {
    let client = await connectDb();
    let data;
    try {
        //Step 2 -- Get the Result
        const result = await client!.query(`SELECT c.author_name, COUNT(*) AS author_count
        FROM books b
        CROSS JOIN LATERAL unnest(b.authors) AS c(author_name)
        WHERE b.user_id = ${userId}
        GROUP BY c.author_name
        ORDER BY author_count DESC;`);
        data = result.rows;
        return data;
    } catch (e) {
        console.log(e);
        throw new Error("Db Connection not established");
    } finally {
        await closeDb(client);
    }
}

/**
 * gets the number of categroy counts
 * @returns the number of category count
 */
export const executeGetCategoryCounts = async (userId: number) => {
    let client = await connectDb();
    let data;
    try {
        const result = await client!.query(`SELECT c.category_name, COUNT(*) AS category_count
        FROM books b
        CROSS JOIN LATERAL unnest(b.category) AS c(category_name)
        WHERE b.user_id = ${userId}
        GROUP BY c.category_name
        ORDER BY category_count DESC;`);
        data = result.rows;
        return data;
    }
    catch (e) {
        console.log(e);
        throw new Error("Db Connection not established");
    } finally {
        await closeDb(client);
    }
};

/**
 * The SQL Query Function to return the stats of the statuses
 * @returns The Status counts
 */
export const executeGetStatusCounts = async (userId: number) => {
    let client = await connectDb();
    let data;
    try {
        const result = await client!.query(`select b.status ,count(b.status) as total  from books b where user_id = ${userId} group by b."status" order by total  desc;`);
        data = result.rows;
        return data;
    } catch (e) {
        console.log(e);
        throw new Error("Db Connection not established");
    } finally {
        await closeDb(client);
    }
};

/**
 * The SQL Query Function to return the average,sum and bookcaount  by authors
 * @returns The Status counts
 */
export const executeGetAverageLikedOfAuthors = async (userId: number) => {
    let client = await connectDb();
    let data;
    try {
        const result = await client!.query(`
            SELECT c.author_name, COUNT(*) AS book_count,
            ROUND(AVG(b.liked), 3) AS avg_liked,
            SUM(b.liked) AS total_liked
            FROM books b
            CROSS JOIN LATERAL unnest(b.authors) AS c(author_name)
            WHERE b.user_id = $1
            GROUP BY c.author_name
            ORDER BY avg_liked DESC;
            `, [userId]);

        data = result.rows;
        return data;
    } catch (e) {
        console.log(e);
        throw new Error("Db Connection not established");
    } finally {
        await closeDb(client);
    }
};

/**
 * The SQL Query Function to return the average,sum and bookcaount  by categories
 * @returns The Status counts
 */
export const executeGetAverageLikedOfCategories = async (userId: number) => {
    let client = await connectDb();
    let data;
    try {
        const result = await client!.query(`
        SELECT c.category_name, COUNT(*) AS book_count,
                ROUND(AVG(b.liked), 3) AS avg_liked,
                SUM(b.liked) AS total_liked
        FROM books b
        CROSS JOIN LATERAL unnest(b.category) AS c(category_name)
        WHERE b.user_id = $1
        GROUP BY c.category_name
        ORDER BY avg_liked DESC;
        `, [userId]);

        data = result.rows;
        return data;
    } catch (e) {
        console.log(e);
        throw new Error("Db Connection not established");
    } finally {
        await closeDb(client);
    }
};