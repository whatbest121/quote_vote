import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CancelVoteDto {
    @ApiProperty({
        description: 'Quote ID to cancel vote on',
        example: '507f1f77bcf86cd799439011'
    })
    @IsString()
    @IsNotEmpty()
    quote_id: string;
} 