/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuoteWithVoteStatusDto } from './QuoteWithVoteStatusDto';
export type PaginatedQuoteResponseDto = {
    docs: Array<QuoteWithVoteStatusDto>;
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: Record<string, any> | null;
    nextPage: Record<string, any> | null;
};

