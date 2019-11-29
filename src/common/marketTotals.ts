import { OrderInfo } from '@0x/mesh-rpc-client';

import { decodeAssetData } from './decodeAssetData';

export interface TotalMarketOrders {
    marketId: string;
    totalOrders: number;
}

export function countTotalNumberOfMarkets(rawOrders: OrderInfo[]): number {
    const orders = rawOrders.map(order => {
        const sorted = [order.signedOrder.makerAssetData, order.signedOrder.takerAssetData].sort();
        return sorted.join('|');
    });
    const uniqueMarkets = [...new Set(orders)];
    return uniqueMarkets.length;
}

export function countTotalOrdersPerMarket(rawOrders: OrderInfo[]): TotalMarketOrders[] {
    const marketId = rawOrders.map(order => {
        const makerAsset = decodeAssetData(order.signedOrder.makerAssetData);
        const takerAsset = decodeAssetData(order.signedOrder.takerAssetData);
        const sorted = [makerAsset.id, takerAsset.id].sort();
        return sorted.join('|');
    });
    const uniqueMarketIds = [...new Set(marketId)];
    return uniqueMarketIds.map(id => {
        let totalCount = 0;
        marketId.forEach(mid => {
            if (mid === id) {
                totalCount++;
            }
        });
        return {
            marketId: id,
            totalOrders: totalCount
        };
    });
}
