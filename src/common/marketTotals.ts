import { BigNumber, OrderInfo } from '@0x/mesh-rpc-client';

import { toTokenAddress } from '../common/tokenAddress';

export interface TotalMarketOrders {
    marketId: string;
    totalOrders: number;
}

export interface MarketOrders {
    marketId: string;
    orders: OrderAmounts[];
}

export interface OrderAmounts {
    makerAddress: string;
    makerAmount: BigNumber;
    takerAmount: BigNumber;
}

/**
 * <<<<<<<>>>>>>>>>.
 */
export function countTotalNumberOfMarkets(orders: OrderInfo[]): number {
    const results = orders.map(order => {
        const sorted = [order.signedOrder.makerAssetData, order.signedOrder.takerAssetData].sort();
        return sorted.join('|');
    });
    const uniqueMarkets = [...new Set(results)];
    return uniqueMarkets.length;
}

/**
 * <<<<<<<>>>>>>>>>.
 */
export function countTotalOrdersPerMarket(orders: OrderInfo[]): TotalMarketOrders[] {
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
        let totalCount = 0;
        results.forEach(r => {
            if (r.id === id) {
                totalCount++;
            }
        });
        return {
            marketId: id,
            totalOrders: totalCount,
        };
    });
}

/**
 * <<<<<<<>>>>>>>>>.
 */
export function getOrdersPerMarket(orders: OrderInfo[]): MarketOrders[] {
    const results = orders.map(order => {
        const makerAssetAddress = toTokenAddress(order.signedOrder.makerAssetData);
        const takerAssetAddress = toTokenAddress(order.signedOrder.takerAssetData);
        const sorted = [makerAssetAddress, takerAssetAddress].sort();
        return {
            id: sorted.join('|'),
            makerAddress: makerAssetAddress,
            makerAmount: order.signedOrder.makerAssetAmount,
            takerAmount: order.signedOrder.takerAssetAmount
        };
    });
    const uniqueMarketIds = [...new Set(results.map(r => r.id))];
    return uniqueMarketIds.map(id => {
        const orderAmounts: OrderAmounts[] = [];
        results.forEach(r => {
            if (r.id === id) {
                orderAmounts.push({
                    makerAddress: r.makerAddress,
                    makerAmount: r.makerAmount,
                    takerAmount: r.takerAmount
                });
            }
        });
        return {
            marketId: id,
            orders: orderAmounts,
        };
    });
}
