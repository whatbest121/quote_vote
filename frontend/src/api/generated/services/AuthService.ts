/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';
import type { LoginResponseDto } from '../models/LoginResponseDto';
import type { RegisterResponseDto } from '../models/RegisterResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * @param requestBody
     * @returns LoginResponseDto
     * @returns any Login success
     * @throws ApiError
     */
    public static authControllerLogin(
        requestBody: CreateUserDto,
    ): CancelablePromise<LoginResponseDto | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * @param requestBody
     * @returns RegisterResponseDto
     * @throws ApiError
     */
    public static authControllerRegister(
        requestBody: CreateUserDto,
    ): CancelablePromise<RegisterResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
