import { ApiProperty } from '@nestjs/swagger';

export class VoteCountResponseDto {
    @ApiProperty({
        description: 'Total vote count for the quote (upvotes - downvotes)',
        example: 5
    })
    voteCount: number;
} 