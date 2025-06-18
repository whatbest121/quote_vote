/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelVoteDto } from '../models/CancelVoteDto';
import type { CheckUserVoteResponseDto } from '../models/CheckUserVoteResponseDto';
import type { HasVotedResponseDto } from '../models/HasVotedResponseDto';
import type { QuoteWithVoteStatusDto } from '../models/QuoteWithVoteStatusDto';
import type { VoteCountResponseDto } from '../models/VoteCountResponseDto';
import type { VoteDto } from '../models/VoteDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VoteService {
    /**
     * @param quoteId Quote ID to get votes for
     * @returns VoteCountResponseDto Get votes for a quote
     * @throws ApiError
     */
    public static voteControllerGetQuoteVotes(
        quoteId: string,
    ): CancelablePromise<VoteCountResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vote/quote/{quote_id}',
            path: {
                'quote_id': quoteId,
            },
        });
    }
    /**
     * @param quoteId Quote ID to check vote status
     * @returns HasVotedResponseDto Check if user has voted on a quote
     * @throws ApiError
     */
    public static voteControllerHasVoted(
        quoteId: string,
    ): CancelablePromise<HasVotedResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vote/hasVoted/{quote_id}',
            path: {
                'quote_id': quoteId,
            },
        });
    }
    /**
     * @param requestBody
     * @returns QuoteWithVoteStatusDto Vote on a quote
     * @throws ApiError
     */
    public static voteControllerVote(
        requestBody: VoteDto,
    ): CancelablePromise<QuoteWithVoteStatusDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vote/vote',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns QuoteWithVoteStatusDto Cancel vote on a quote
     * @throws ApiError
     */
    public static voteControllerCancelVote(
        requestBody: CancelVoteDto,
    ): CancelablePromise<QuoteWithVoteStatusDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/vote/cancelVote',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns CheckUserVoteResponseDto Check if user has voted on any quote
     * @throws ApiError
     */
    public static voteControllerCheckUserVote(): CancelablePromise<CheckUserVoteResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vote/checkUserVote',
        });
    }
}
