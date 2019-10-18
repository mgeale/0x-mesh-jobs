import * as fs from "fs";
import * as path from "path";
import { OrderInfo } from '@0x/mesh-rpc-client';

export function loadTestOrderInfo(): OrderInfo[] {
    const rawData = fs.readFileSync(path.join(__dirname, '../../testData/meshOrders.json'));
    return JSON.parse(rawData.toString());
}