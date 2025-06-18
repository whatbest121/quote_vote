import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuoteDto {
    @ApiProperty({ example: 'สีเหลือง' })
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    quote: string;
}
