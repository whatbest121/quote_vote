import { ApiProperty } from '@nestjs/swagger';

export class QuoteWithVoteStatusDto {
    @ApiProperty({
        description: 'Quote ID',
        example: '507f1f77bcf86cd799439011'
    })
    _id: string;

    @ApiProperty({
        description: 'User ID who created the quote',
        example: '507f1f77bcf86cd799439012'
    })
    user_id: string;

    @ApiProperty({
        description: 'The quote text',
        example: 'Life is what happens when you\'re busy making other plans.'
    })
    quote: string;

    @ApiProperty({
        description: 'Whether the current user has voted on this quote',
        example: true
    })
    hasVoted: boolean;

    @ApiProperty({
        description: 'Whether the current user can vote on this quote',
        example: false
    })
    canVote: boolean;

    @ApiProperty({
        description: 'Whether this quote belongs to the current user',
        example: false
    })
    isOwnQuote: boolean;

    @ApiProperty({
        description: 'Total vote count for this quote (upvotes - downvotes)',
        example: 5
    })
    voteCount: number;

    @ApiProperty({
        description: 'When the quote was created',
        example: '2024-01-01T00:00:00.000Z'
    })
    createdAt: Date;

    @ApiProperty({
        description: 'When the quote was last updated',
        example: '2024-01-01T00:00:00.000Z'
    })
    updatedAt: Date;

    @ApiProperty({
        description: 'MongoDB version key',
        example: 0
    })
    __v: number;
} 