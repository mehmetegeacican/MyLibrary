import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

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
        const prisma = new PrismaClient();
        // Step 3 Verify Token
        try {
            const { _id } = jwt.verify(token, process.env.SECRET!) as { _id: string };
            const idExists = await prisma.user.findUnique({
                where: {
                    id: _id,
                },
            });
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
