import { OrderInfo } from '@0x/mesh-rpc-client';
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
    const rawData = fs.readFileSync(path.join(__dirname, '../../testData/meshOrders.json'));
    return JSON.parse(rawData.toString());
}
