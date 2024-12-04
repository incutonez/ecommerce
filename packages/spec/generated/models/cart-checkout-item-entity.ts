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
import { ProductListEntity } from './product-list-entity';

/**
 * 
 * @export
 * @interface CartCheckoutItemEntity
 */
export interface CartCheckoutItemEntity {
    /**
     * 
     * @type {string}
     * @memberof CartCheckoutItemEntity
     */
    'userId': string;
    /**
     * 
     * @type {string}
     * @memberof CartCheckoutItemEntity
     */
    'productId': string;
    /**
     * 
     * @type {number}
     * @memberof CartCheckoutItemEntity
     */
    'count': number;
    /**
     * 
     * @type {ProductListEntity}
     * @memberof CartCheckoutItemEntity
     */
    'product': ProductListEntity;
    /**
     * 
     * @type {number}
     * @memberof CartCheckoutItemEntity
     */
    'subTotal': number;
    /**
     * 
     * @type {number}
     * @memberof CartCheckoutItemEntity
     */
    'id'?: number;
}
