import { OrderInfo } from '@0x/mesh-rpc-client';

import { toTokenAddress } from '../common/tokenAddress';

export interface TotalMarketOrders {
    id: string;
    totalOrders: number;
}

export interface MarketOrders {
    id: string;
    orders: any[];
}

export function countTotalNumberOfMarkets(orders: OrderInfo[]): number {
    const results = orders.map(order => {
        const sorted = [order.signedOrder.makerAssetData, order.signedOrder.takerAssetData].sort();
        return sorted.join('|');
    });
    const uniqueMarkets = [...new Set(results)];
    return uniqueMarkets.length;
}

export function countTotalOrdersPerMarket(orders: OrderInfo[]): TotalMarketOrders[] {
    const results = orders.map(order => {
        const makerAssetAddress = toTokenAddress(order.signedOrder.makerAssetData);
        const takerAssetAddress = toTokenAddress(order.signedOrder.takerAssetData);
        const sorted = [makerAssetAddress, takerAssetAddress].sort();
        return {
            id: sorted.join('|'),
            makerPosition: sorted[0] === makerAssetAddress ? 0 : 1,
        };
    });
    const uniqueMarketIds = [...new Set(results.map(r => r.id))];
    return uniqueMarketIds.map(id => {
        let totalCount = 0;
        results.forEach(r => {
            if (r.id === id) {
                totalCount++;
            }
        });
        return {
            id,
            totalOrders: totalCount,
        };
    });
}

export function getOrdersPerMarket(orders: OrderInfo[]): MarketOrders[] {
    const results = orders.map(order => {
        const makerAssetAddress = toTokenAddress(order.signedOrder.makerAssetData);
        const takerAssetAddress = toTokenAddress(order.signedOrder.takerAssetData);
        const sorted = [makerAssetAddress, takerAssetAddress].sort();
        return {
            id: sorted.join('|'),
            makerPosition: sorted[0] === makerAssetAddress ? 0 : 1,
            makerAmount: parseFloat(order.signedOrder.makerAssetAmount.shiftedBy(-18).toString()),
            takerAmount: parseFloat(order.signedOrder.takerAssetAmount.shiftedBy(-18).toString()),
        };
    });
    const uniqueMarketIds = [...new Set(results.map(r => r.id))];
    return uniqueMarketIds.map(id => {
        const orders = [[], []];
        results.forEach(r => {
            if (r.id === id) {
                orders[r.makerPosition].push([r.makerAmount, r.takerAmount]);
            }
        });
        return {
            id,
            orders,
        };
    });
}
