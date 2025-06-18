/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type QuoteWithVoteStatusDto = {
    /**
     * Quote ID
     */
    _id: string;
    /**
     * User ID who created the quote
     */
    user_id: string;
    /**
     * The quote text
     */
    quote: string;
    /**
     * Whether the current user has voted on this quote
     */
    hasVoted: boolean;
    /**
     * Whether the current user can vote on this quote
     */
    canVote: boolean;
    /**
     * Whether this quote belongs to the current user
     */
    isOwnQuote: boolean;
    /**
     * Total vote count for this quote (upvotes - downvotes)
     */
    voteCount: number;
    /**
     * When the quote was created
     */
    createdAt: string;
    /**
     * When the quote was last updated
     */
    updatedAt: string;
    /**
     * MongoDB version key
     */
    __v: number;
};

