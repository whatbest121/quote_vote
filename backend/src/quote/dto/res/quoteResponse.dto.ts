import { ApiProperty } from '@nestjs/swagger';

export class QuoteResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  user_id: string;

  @ApiProperty()
  quote: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  __v: number;
}
