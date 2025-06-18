import { Body, Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginateQueryDto } from './dto/query-paginated.dto';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { EditQuoteDto } from './dto/edit-quote.dto';
import { PaginatedQuoteResponseDto } from './dto/res/paginatedQuoteResponse.dto';
import { QuoteResponseDto } from './dto/res/quoteResponse.dto';

@ApiTags('Quote')
@Controller('quote')
@ApiBearerAuth('access-token')
export class QuoteController {
    constructor(private readonly quoteService: QuoteService) { }

    @Get()
    @ApiResponse({ status: 200, type: PaginatedQuoteResponseDto })
    @ApiQuery({ type: PaginateQueryDto })
    async getPaginatedQuotes(@Query() query: PaginateQueryDto) {
        const { search, page, limit, sort } = query;
        const result = await this.quoteService.paginateQuotes(
            search,
            +(page || 1),
            +(limit || 10),
            sort || 'createdAt',
        );
        return result
    }

    @Post("create")
    @ApiResponse({ status: 201, type: QuoteResponseDto })
    @ApiBody({ type: CreateQuoteDto })
    async createQuote(@Body() body: CreateQuoteDto, @Req() req: Request) {
        const result = await this.quoteService.createQuote(body.quote, req["users"]._id)
        return result
    }

    @Post("editQuote")
    @ApiResponse({ status: 200, type: QuoteResponseDto })
    @ApiBody({ type: EditQuoteDto })
    async editQuote(@Body() body: EditQuoteDto, @Req() req: Request) {

        const result = await this.quoteService.editQuote(body._id, body.quote, req["users"]._id)
        return result
    }

    @Delete("deleteQuote/:_id")
    @ApiResponse({ status: 200, type: QuoteResponseDto })
    @ApiParam({
        name: '_id',
        type: String,
        description: 'Quote ID to delete',
        example: 'xxxxxxxxxxx'
    })
    async deleteQuote(@Param("_id") _id: string, @Req() req: Request) {
        const result = await this.quoteService.deleteQuotes(_id, req["users"]._id)
        return result
    }

    @Get("getQuote/use_id")
    @ApiResponse({ status: 200, type: QuoteResponseDto })
    async getQuoteUser(@Req() req: Request) {
        const result = await this.quoteService.getByuser(req["user"]._id)
        return result
    }




}
