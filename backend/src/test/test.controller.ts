import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { TestDTO } from './test.dto';

@ApiTags('Test')
@Controller('test')
@ApiBearerAuth('access-token')
export class TestController {
    @Post('test')
    @ApiBody({ type: TestDTO })
    test(@Body() body: TestDTO, @Req() req: Request) {
        console.log("🚀 ~ TestController ~ test ~ req:", req["users"])

        const sum = body.number1 + body.number2
        return sum
    }
}
