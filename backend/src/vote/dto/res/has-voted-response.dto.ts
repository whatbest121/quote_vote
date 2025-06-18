import { ApiProperty } from '@nestjs/swagger';

export class HasVotedResponseDto {
    @ApiProperty({
        description: 'Whether the user has voted on the specified quote',
        example: true
    })
    hasVoted: boolean;
} 