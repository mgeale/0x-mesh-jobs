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
    maker: AssetAmounts;
    taker: AssetAmounts;
}

interface AssetAmounts {
    id: string;
    amount: BigNumber;
    multiAssetAmounts: BigNumber[];
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
    const results = reformatOrders(orders);
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
    const results = reformatOrders(orders);
    const uniqueMarketIds = [...new Set(results.map(r => r.id))];
    return uniqueMarketIds.map(id => {
        const orderAmounts: OrderAmounts[] = [];
        results.forEach(r => {
            if (r.id === id) {
                orderAmounts.push({
                    maker: {
                        id: r.maker.tokenAddress,
                        amount: r.makerAmount,
                        multiAssetAmounts: r.maker.amounts ? r.maker.amounts : null
                    },
                    taker: {
                        id: r.taker.tokenAddress,
                        amount: r.takerAmount,
                        multiAssetAmounts: r.taker.amounts ? r.taker.amounts : null
                    }
                });
            }
        });
        return {
            marketId: id,
            orders: orderAmounts
        };
    });
}

function reformatOrders(orders: OrderInfo[]) {
    return orders.map(order => {
        const makerAsset = decodeAssetData(order.signedOrder.makerAssetData);
        const takerAsset = decodeAssetData(order.signedOrder.takerAssetData);
        const sorted = [makerAsset.tokenAddress, takerAsset.tokenAddress].sort();
        return {
            id: sorted.join('|'),
            maker: makerAsset,
            makerAmount: order.signedOrder.makerAssetAmount,
            taker: takerAsset,
            takerAmount: order.signedOrder.takerAssetAmount,
        };
    })
}
