import { Controller, Get, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
@ApiBearerAuth('access-token')
export class UsersController {
    @Get('profile')
    getProfile(@Req() req: Request) {
        return req['users'];
    }
}
