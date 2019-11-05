import { BigNumber, OrderInfo } from '@0x/mesh-rpc-client';

import { decodeAssetData } from './decodeAssetData';

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
    multiAssetAmounts?: any;
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
    const results = formatOrders(orders);
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
            totalOrders: totalCount
        };
    });
}

export function getOrdersPerMarket(orders: OrderInfo[]): MarketOrders[] {
    const results = formatOrders(orders);
    const uniqueMarketIds = [...new Set(results.map(r => r.id))];
    return uniqueMarketIds.map(id => {
        const orderAmounts: OrderAmounts[] = [];
        results.forEach(r => {
            if (r.id === id) {
                orderAmounts.push({
                    makerAddress: r.makerAddress,
                    makerAmount: r.makerAmount,
                    takerAmount: r.takerAmount,
                    multiAssetAmounts: r.multiAssetAmounts ? r.multiAssetAmounts : null,
                });
            }
        });
        return {
            marketId: id,
            orders: orderAmounts,
        };
    });
}

function formatOrders(orders: OrderInfo[]) {
    let results = [];
    for (const order of orders) {
        const makerAsset = decodeAssetData(order.signedOrder.makerAssetData);
        const takerAsset = decodeAssetData(order.signedOrder.takerAssetData);
        const sorted = [makerAsset.tokenAddress, takerAsset.tokenAddress].sort();
        const amounts = sorted[0] === makerAsset.tokenAddress ? [makerAsset.amounts, takerAsset.amounts] : [takerAsset.amounts, makerAsset.amounts];
        results.push({
            id: sorted.join('|'),
            makerAddress: makerAsset.tokenAddress,
            makerAmount: order.signedOrder.makerAssetAmount,
            takerAmount: order.signedOrder.takerAssetAmount,
            multiAssetAmounts: amounts,
        });
    }
    return results;
}
