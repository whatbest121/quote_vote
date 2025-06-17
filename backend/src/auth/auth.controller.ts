import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Public } from './public.decorator';
import { LoginResponseDto } from 'src/users/dto/login-response.dto';
import { RegisterResponseDto } from 'src/users/dto/register-response.dto';
import { CreateUserDto } from 'src/users/create-user.dto';

@Public()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) { }

    @Post('login')
    @ApiOkResponse({ type: LoginResponseDto })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ status: 201, description: 'Login success' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async login(@Body() body: CreateUserDto) {
        const user = await this.authService.validateUser(body.username, body.password);
        return this.authService.login(user);
    }

    @Post('register')
    @ApiOkResponse({ type: RegisterResponseDto })
    @ApiBody({ type: CreateUserDto })
    async register(@Body() body: CreateUserDto) {
        return this.usersService.create(body.username, body.password);
    }
}
