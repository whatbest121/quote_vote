import { IsString, MinLength, MaxLength, Matches, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TestDTO {
    @ApiProperty({ example: 1 })
    @IsNumber()

    number1: number;

    @ApiProperty({ example: 2 })
    @IsNumber()
    number2: number;
}
