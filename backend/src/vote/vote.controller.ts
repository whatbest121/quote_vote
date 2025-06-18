import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VoteService } from './vote.service';
import { QuoteResponseDto } from 'src/quote/dto/res/quoteResponse.dto';
import { hasVoted } from './dto/res-vote-has.dto';
import { VoteResponseDto } from './dto/res-vote.dto';

@ApiTags('Vote')
@Controller('vote')
@ApiBearerAuth('access-token')
export class VoteController {
    constructor(private readonly voteService: VoteService) { }
    @Post('/:_id')
    @ApiResponse({ status: 200, type: QuoteResponseDto })
    @ApiParam({
        name: '_id',
        type: String,
        description: 'Quote ID ',
        example: 'xxxxxxxxxxx'
    })
    async getVote(@Param("_id") _id: string) {
        return await this.voteService.quote_votes(_id)
    }

    @Get('has-voted/:quote_id')
    @ApiResponse({ status: 200, type: hasVoted })
    @ApiParam({
        name: 'quote_id',
        type: String,
        description: 'Quote ID ',
        example: 'xxxxxxxxxxx'
    })
    async hasVoted(
        @Param('quote_id') quote_id: string,
        @Req() req: Request
    ) {
        const user_id = req['users']._id;
        const result = await this.voteService.hasVoted(user_id, quote_id);
        return { hasVoted: result };
    }

    @Post('vot/:quote_id')
    @ApiResponse({ status: 201, type: VoteResponseDto })
    @ApiParam({
        name: 'quote_id',
        type: String,
        description: 'Quote ID ',
        example: 'xxxxxxxxxxx'
    })
    async vote(@Param('quote_id') quote_id: string, @Req() req: Request) {
        return await this.voteService.vote(req["users"]._id, quote_id)
    }

    @Post('cancelVot/:quote_id')
    @ApiResponse({ status: 201, type: VoteResponseDto })
    @ApiParam({
        name: 'quote_id',
        type: String,
        description: 'Quote ID ',
        example: 'xxxxxxxxxxx'
    })
    async cancelVote(@Param('quote_id') quote_id: string, @Req() req: Request) {
        return await this.voteService.cancelVote(req["users"]._id, quote_id)
    }

    @Get('chackVote')
    async chackVote( @Req() req: Request) {
        return await this.voteService.chackUserVote(req["users"]._id)
    }

    

}
