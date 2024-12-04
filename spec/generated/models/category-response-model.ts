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
import { CategoryEntity } from './category-entity';

/**
 * 
 * @export
 * @interface CategoryResponseModel
 */
export interface CategoryResponseModel {
    /**
     * 
     * @type {Array<CategoryEntity>}
     * @memberof CategoryResponseModel
     */
    'data': Array<CategoryEntity>;
    /**
     * 
     * @type {number}
     * @memberof CategoryResponseModel
     */
    'total'?: number;
}
