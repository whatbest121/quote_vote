import { ApiProperty } from '@nestjs/swagger';

export class VoteResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  user_id: string;

  @ApiProperty()
  quote_id: string;

  @ApiProperty({ enum: ['up', 'down'] })
  vote: 'up' | 'down';

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  __v: number;
}
