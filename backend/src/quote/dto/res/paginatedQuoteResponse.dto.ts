import { ApiProperty } from '@nestjs/swagger';
import { QuoteWithVoteStatusDto } from '../../../vote/dto/res/quote-with-vote-status.dto';

export class PaginatedQuoteResponseDto {
    @ApiProperty({ type: [QuoteWithVoteStatusDto] })
    docs: QuoteWithVoteStatusDto[];

    @ApiProperty()
    totalDocs: number;

    @ApiProperty()
    limit: number;

    @ApiProperty()
    totalPages: number;

    @ApiProperty()
    page: number;

    @ApiProperty()
    pagingCounter: number;

    @ApiProperty()
    hasPrevPage: boolean;

    @ApiProperty()
    hasNextPage: boolean;

    @ApiProperty({ nullable: true })
    prevPage: number | null;

    @ApiProperty({ nullable: true })
    nextPage: number | null;
}
