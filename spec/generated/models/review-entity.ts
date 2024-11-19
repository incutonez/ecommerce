/* tslint:disable */
/* eslint-disable */
/**
 * API
 * The main API for all Sandbox apps
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { UserEntity } from './user-entity';

/**
 * 
 * @export
 * @interface ReviewEntity
 */
export interface ReviewEntity {
    /**
     * 
     * @type {string}
     * @memberof ReviewEntity
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof ReviewEntity
     */
    'title': string;
    /**
     * 
     * @type {string}
     * @memberof ReviewEntity
     */
    'description': string;
    /**
     * 
     * @type {number}
     * @memberof ReviewEntity
     */
    'rating': number;
    /**
     * 
     * @type {number}
     * @memberof ReviewEntity
     */
    'createdDate': number;
    /**
     * 
     * @type {UserEntity}
     * @memberof ReviewEntity
     */
    'createdBy': UserEntity;
}

