import { BigNumber, OrderInfo } from '@0x/mesh-rpc-client';
import * as fs from 'fs';
import * as path from 'path';

/**
 * This is a function.
 *
 * @param {string} n - A string param
 * @return {OrderInfo[]} array of Mesh Orders
 *
 * @example
 *
 *     foo('hello')
 */
export function loadTestOrderInfo(): OrderInfo[] {
    const rawData = fs.readFileSync(path.join(__dirname, '../../testData/meshOrdersShortList.json'));
    const orders = JSON.parse(rawData.toString());
    return orders.map(o => {
        return {
            orderHash: o.orderHash,
            signedOrder: {
                ...o.signedOrder,
                makerFee: new BigNumber(o.signedOrder.makerFee),
                takerFee: new BigNumber(o.signedOrder.takerFee),
                makerAssetAmount: new BigNumber(o.signedOrder.makerAssetAmount),
                takerAssetAmount: new BigNumber(o.signedOrder.takerAssetAmount),
                salt: new BigNumber(o.signedOrder.salt),
                expirationTimeSeconds: new BigNumber(o.signedOrder.expirationTimeSeconds)
            },
            fillableTakerAssetAmount: o.fillableTakerAssetAmount
        };
    });
}
