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
// May contain unused imports in some cases
// @ts-ignore
import { ImageEntity } from './image-entity';

/**
 * 
 * @export
 * @interface ProductListEntity
 */
export interface ProductListEntity {
    /**
     * 
     * @type {string}
     * @memberof ProductListEntity
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof ProductListEntity
     */
    'name': string;
    /**
     * 
     * @type {number}
     * @memberof ProductListEntity
     */
    'price': number;
    /**
     * 
     * @type {string}
     * @memberof ProductListEntity
     */
    'description': string;
    /**
     * 
     * @type {CategoryEntity}
     * @memberof ProductListEntity
     */
    'category': CategoryEntity;
    /**
     * 
     * @type {ImageEntity}
     * @memberof ProductListEntity
     */
    'image': ImageEntity;
    /**
     * 
     * @type {number}
     * @memberof ProductListEntity
     */
    'rating': number;
}

