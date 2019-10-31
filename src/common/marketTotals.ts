import { BigNumber, OrderInfo } from '@0x/mesh-rpc-client';

import { toTokenAddress } from '../common/tokenAddress';
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
    const results = formatOrders(orders);
    console.log(results)
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

/**
 * <<<<<<<>>>>>>>>>.
 */
export function getOrdersPerMarket(orders: OrderInfo[]): MarketOrders[] {
    const results = formatOrders(orders);
    console.log(results)
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
            orders: orderAmounts
        };
    });
}

function formatOrders(orders: OrderInfo[]) {
    let results = [];
    for (const order of orders) {
        const makerAssets = decodeAssetData(order.signedOrder.makerAssetData);
        const takerAssets = decodeAssetData(order.signedOrder.takerAssetData);

        for (const makerAsset of makerAssets) {
            for (const takerAsset of takerAssets) {
                const sorted = [makerAsset.tokenAddress, takerAsset.tokenAddress].sort();
                let makerAmount = order.signedOrder.makerAssetAmount;
                let takerAmount = order.signedOrder.takerAssetAmount;
                if (makerAsset.amount) {
                    makerAmount = makerAsset.amount.multipliedBy(order.signedOrder.makerAssetAmount);
                    takerAmount = order.signedOrder.takerAssetAmount.dividedBy(makerAssets.length);
                }
                if (takerAsset.amount) {
                    takerAmount = takerAsset.amount.multipliedBy(order.signedOrder.takerAssetAmount);
                    makerAmount = order.signedOrder.makerAssetAmount.dividedBy(takerAssets.length);
                }
                results.push({
                    id: sorted.join('|'),
                    makerPosition: sorted[0] === makerAsset.tokenAddress ? 0 : 1,
                    makerAmount: makerAmount,
                    takerAmount: takerAmount
                });
            }
        }
    }
    return results;
}
