/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type VoteResponseDto = {
    _id: string;
    user_id: string;
    quote_id: string;
    vote: VoteResponseDto.vote;
    createdAt: string;
    updatedAt: string;
    __v: number;
};
export namespace VoteResponseDto {
    export enum vote {
        UP = 'up',
        DOWN = 'down',
    }
}

