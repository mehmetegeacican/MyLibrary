import jwt from 'jsonwebtoken';
import { connectDb, closeDb } from '../dbconnection';
import { Request, Response, NextFunction } from 'express';

const checkIfUserIdExists = async (id: string): Promise<boolean> => {
    let client;
    try {
        client = await connectDb();
        const checkQuery = `SELECT ID FROM "User"
        WHERE id = $1`;
        const values = [id];
        const result = await client!.query(checkQuery, values);
        return result.rowCount > 0;
    } catch (e) {
        console.error(e);
        throw new Error("Db Connection Unsuccessful");
    } finally {
        if (client) await closeDb(client);
    }
}

/**
 * 
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
const reqAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Step 1 -- Verify Auth
    const { authorization } = req.headers as { authorization?: string };
    // Step 2 -- Check if there is no authorization
    if (!authorization) {
        res.status(401).json({ error: 'Authorization token required' });
    }
    // [Bearer, asdasdaas]
    else {
        const token = authorization.split(" ")[1];
        // Step 3 Verify Token
        try {
            const { _id } = jwt.verify(token, process.env.SECRET!) as { _id: string };
            const idExists = await checkIfUserIdExists(_id);
            if (idExists) {
                next();
            } else {
                res.status(401).json({ error: "Request is not authorized" });
            }
        } catch (error) {
            console.error(error);
            res.status(401).json({ error: "Request is not authorized" });
        }
    }

}

export default reqAuth;
