import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) { }

    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        if (!authHeader) throw new UnauthorizedException('Missing Authorization header');

        const token = authHeader.split(' ')[1];
        if (!token) throw new UnauthorizedException('Missing token');

        try {
            const decoded = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_SECRET'),
            });

            if (!decoded?.username) {
                throw new UnauthorizedException('Invalid token payload');
            }

            req['users'] = decoded;
            next();
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
