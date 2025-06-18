import { ApiProperty } from '@nestjs/swagger';
import { QuoteDto } from './quote.dto';

export class PaginatedQuoteResponseDto {
    @ApiProperty({ type: [QuoteDto] })
    docs: QuoteDto[];

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
