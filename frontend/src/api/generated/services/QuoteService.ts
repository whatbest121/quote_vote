/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateQuoteDto } from '../models/CreateQuoteDto';
import type { EditQuoteDto } from '../models/EditQuoteDto';
import type { PaginatedQuoteResponseDto } from '../models/PaginatedQuoteResponseDto';
import type { QuoteResponseDto } from '../models/QuoteResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QuoteService {
    /**
     * @param search Search keyword for quote or user_id
     * @param page Page number
     * @param limit Items per page
     * @param sort Field to sort by (e.g., createdAt, vote)
     * @param search Search keyword for quote or user_id
     * @param page Page number
     * @param limit Items per page
     * @param sort Field to sort by (e.g., createdAt, vote)
     * @returns PaginatedQuoteResponseDto
     * @throws ApiError
     */
    public static quoteControllerGetPaginatedQuotes(
        search?: string,
        page: string = '1',
        limit: string = '10',
        sort: string = 'createdAt',

    ): CancelablePromise<PaginatedQuoteResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/quote',
            query: {
                'search': search,
                'page': page,
                'limit': limit,
                'sort': sort,

            },
        });
    }
    /**
     * @param requestBody
     * @returns QuoteResponseDto
     * @throws ApiError
     */
    public static quoteControllerCreateQuote(
        requestBody: CreateQuoteDto,
    ): CancelablePromise<QuoteResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/quote/create',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns QuoteResponseDto
     * @throws ApiError
     */
    public static quoteControllerEditQuote(
        requestBody: EditQuoteDto,
    ): CancelablePromise<QuoteResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/quote/editQuote',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id Quote ID to delete
     * @returns QuoteResponseDto
     * @throws ApiError
     */
    public static quoteControllerDeleteQuote(
        id: string,
    ): CancelablePromise<QuoteResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/quote/deleteQuote/{_id}',
            path: {
                '_id': id,
            },
        });
    }
    /**
     * @returns QuoteResponseDto
     * @throws ApiError
     */
    public static quoteControllerGetQuoteUser(): CancelablePromise<QuoteResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/quote/getQuote/use_id',
        });
    }
}
