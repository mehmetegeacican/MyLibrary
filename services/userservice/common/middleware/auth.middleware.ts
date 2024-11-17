import { HttpException, HttpStatus, Inject, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

export class AuthMiddleware implements NestMiddleware {
    constructor(
        @Inject(ConfigService) private readonly configService: ConfigService,
    ) { }
    use(req: Request, res: Response, next: NextFunction) {
        // Step 1 -- Check Header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new HttpException('No token found', HttpStatus.UNAUTHORIZED);
        }
        // Step 2 -- Extract the JWT token from the Authorization header
        const token = authHeader.split(' ')[1];
        // Verify and decode the JWT token
        try {
            const decoded = jwt.verify(token, this.configService.get('SECRET'));
            next();
        } catch (error) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }

}