import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { TestDTO } from './test.dto';

@ApiTags('Test')
@Controller('test')
@ApiBearerAuth('access-token')
export class TestController {
    @Post('test')
    @ApiBody({ type: TestDTO })
    test(@Body() body: TestDTO) {
        const sum = body.number1 + body.number2
        return sum
    }
}
