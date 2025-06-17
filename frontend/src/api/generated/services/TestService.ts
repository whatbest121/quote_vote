/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TestDTO } from '../models/TestDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TestService {
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static testControllerTest(
        requestBody: TestDTO,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/test/test',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
