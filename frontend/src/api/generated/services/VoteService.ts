/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { hasVoted } from '../models/hasVoted';
import type { QuoteResponseDto } from '../models/QuoteResponseDto';
import type { VoteResponseDto } from '../models/VoteResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VoteService {
    /**
     * @param id Quote ID
     * @returns QuoteResponseDto
     * @throws ApiError
     */
    public static voteControllerGetVote(
        id: string,
    ): CancelablePromise<QuoteResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vote/{_id}',
            path: {
                '_id': id,
            },
        });
    }
    /**
     * @param quoteId Quote ID
     * @returns hasVoted
     * @throws ApiError
     */
    public static voteControllerHasVoted(
        quoteId: string,
    ): CancelablePromise<hasVoted> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vote/has-voted/{quote_id}',
            path: {
                'quote_id': quoteId,
            },
        });
    }
    /**
     * @param quoteId Quote ID
     * @returns VoteResponseDto
     * @throws ApiError
     */
    public static voteControllerVote(
        quoteId: string,
    ): CancelablePromise<VoteResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vote/vot/{quote_id}',
            path: {
                'quote_id': quoteId,
            },
        });
    }
    /**
     * @param quoteId Quote ID
     * @returns VoteResponseDto
     * @throws ApiError
     */
    public static voteControllerCancelVote(
        quoteId: string,
    ): CancelablePromise<VoteResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vote/cancelVot/{quote_id}',
            path: {
                'quote_id': quoteId,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static voteControllerChackVote(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vote/chackVote',
        });
    }
}
