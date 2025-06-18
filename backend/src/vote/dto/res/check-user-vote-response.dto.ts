import { ApiProperty } from '@nestjs/swagger';

export class CheckUserVoteResponseDto {
    @ApiProperty({
        description: 'Whether the user has voted on any quote',
        example: true
    })
    hasVotedOnAny: boolean;
} 