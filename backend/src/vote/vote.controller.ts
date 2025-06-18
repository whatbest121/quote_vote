import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VoteService } from './vote.service';
import { VoteDto } from './dto/vote.dto';
import { CancelVoteDto } from './dto/cancel-vote.dto';
import { VoteCountResponseDto } from './dto/res/vote-count-response.dto';
import { HasVotedResponseDto } from './dto/res/has-voted-response.dto';
import { CheckUserVoteResponseDto } from './dto/res/check-user-vote-response.dto';
import { QuoteWithVoteStatusDto } from './dto/res/quote-with-vote-status.dto';

@ApiTags('Vote')
@Controller('vote')
@ApiBearerAuth('access-token')
export class VoteController {
    constructor(private readonly voteService: VoteService) { }

    @Get('quote/:quote_id')
    @ApiResponse({
        status: 200,
        description: 'Get votes for a quote',
        type: VoteCountResponseDto
    })
    @ApiParam({
        name: 'quote_id',
        type: String,
        description: 'Quote ID to get votes for',
        example: '507f1f77bcf86cd799439011'
    })
    async getQuoteVotes(@Param('quote_id') quote_id: string) {
        const result = await this.voteService.quote_votes(quote_id);
        return { voteCount: result };
    }

    @Get('hasVoted/:quote_id')
    @ApiResponse({
        status: 200,
        description: 'Check if user has voted on a quote',
        type: HasVotedResponseDto
    })
    @ApiParam({
        name: 'quote_id',
        type: String,
        description: 'Quote ID to check vote status',
        example: '507f1f77bcf86cd799439011'
    })
    async hasVoted(@Param('quote_id') quote_id: string, @Req() req: Request) {
        const result = await this.voteService.hasVoted(req["users"]._id, quote_id);
        return { hasVoted: result };
    }

    @Post('vote')
    @ApiResponse({
        status: 201,
        description: 'Vote on a quote',
        type: QuoteWithVoteStatusDto
    })
    @ApiBody({ type: VoteDto })
    async vote(@Body() body: VoteDto, @Req() req: Request) {
        const result = await this.voteService.vote(req["users"]._id, body.quote_id);
        return result;
    }

    @Delete('cancelVote')
    @ApiResponse({
        status: 200,
        description: 'Cancel vote on a quote',
        type: QuoteWithVoteStatusDto
    })
    @ApiBody({ type: CancelVoteDto })
    async cancelVote(@Body() body: CancelVoteDto, @Req() req: Request) {
        const result = await this.voteService.cancelVote(req["users"]._id, body.quote_id);
        return result;
    }

    @Get('checkUserVote')
    @ApiResponse({
        status: 200,
        description: 'Check if user has voted on any quote',
        type: CheckUserVoteResponseDto
    })
    async checkUserVote(@Req() req: Request) {
        const result = await this.voteService.chackUserVote(req["users"]._id);
        return { hasVotedOnAny: result };
    }
}
