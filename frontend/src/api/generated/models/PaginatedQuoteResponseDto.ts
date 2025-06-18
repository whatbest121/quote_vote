/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuoteDto } from './QuoteDto';
export type PaginatedQuoteResponseDto = {
    docs: Array<QuoteDto>;
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

