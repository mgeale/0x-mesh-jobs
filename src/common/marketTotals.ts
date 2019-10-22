import { OrderInfo } from '@0x/mesh-rpc-client';

import { toTokenAddress } from '../common/tokenAddress';

export interface TotalMarketOrders {
    id: string;
    totalOrders: string;
}

export function calculateTotalNumberOfMarkets(orders: OrderInfo[]): number {
    const results = orders.map(order => {
        const sorted = [order.signedOrder.makerAssetData, order.signedOrder.takerAssetData].sort();
        return sorted.join('|');
    });
    const uniqueMarkets = [...new Set(results)];
    return uniqueMarkets.length;
}

export function calculateTotalOrdersPerMarket(orders: OrderInfo[]): TotalMarketOrders[] {
    const results = orders.map(order => {
        const makerAssetAddress = toTokenAddress(order.signedOrder.makerAssetData);
        const takerAssetAddress = toTokenAddress(order.signedOrder.takerAssetData);
        const sorted = [makerAssetAddress, takerAssetAddress].sort();
        return {
            id: sorted.join('|'),
            makerPosition: sorted[0] === makerAssetAddress ? 0 : 1
        };
    });
    const uniqueMarketIds = [...new Set(results.map(r => r.id))];
    return uniqueMarketIds.map(id => {
        const count = [0, 0];
        results.forEach(r => {
            if (r.id === id) {
                if (r.makerPosition === 0) {
                    count[0]++;
                } else if (r.makerPosition === 1) {
                    count[1]++;
                }
            }
        });
        return {
            id,
            totalOrders: count.join('|')
        };
    });
}
