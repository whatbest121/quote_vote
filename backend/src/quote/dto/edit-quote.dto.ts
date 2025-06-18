import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditQuoteDto {
    @ApiProperty({ example: 'สีเหลือง' })
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    quote: string;

    @ApiProperty({ example: 'xxxx-xxxxx-xxxx' })
    @IsString()
    @MinLength(3)
    @MaxLength(100)
    _id: string;
}
