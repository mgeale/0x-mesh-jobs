import { BigNumber, OrderInfo } from '@0x/mesh-rpc-client';

import { decodeAssetData, DecodedAssetData } from './decodeAssetData';

export interface MarketOrders {
    marketId: string;
    orders: OrderAmounts[];
}

export interface DecodedOrders {
    marketId: string;
    maker: DecodedAssetData;
    makerAddress: string;
    makerAmount: BigNumber;
    taker: DecodedAssetData;
    takerAmount: BigNumber;
}

export interface OrderAmounts {
    makerAddress: string;
    makerAsset: AssetAmounts;
    takerAsset: AssetAmounts;
}

export declare type AssetAmounts = DecodedAssetData & {
    amount: BigNumber;
};

export function getOrdersPerMarket(rawOrders: OrderInfo[]): MarketOrders[] {
    const orders = decodeOrders(rawOrders);
    const uniqueMarketIds = [...new Set(orders.map(r => r.marketId))];
    return uniqueMarketIds.map(id => {
        const orderAmounts: OrderAmounts[] = [];
        orders.forEach(o => {
            if (o.marketId === id) {
                delete o.maker.id;
                delete o.taker.id;
                orderAmounts.push({
                    makerAddress: o.makerAddress,
                    makerAsset: {
                        ...o.maker,
                        amount: o.makerAmount
                    },
                    takerAsset: {
                        ...o.taker,
                        amount: o.takerAmount
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

function decodeOrders(orders: OrderInfo[]): DecodedOrders[] {
    return orders.map(order => {
        const maker = decodeAssetData(order.signedOrder.makerAssetData);
        const taker = decodeAssetData(order.signedOrder.takerAssetData);
        const sorted = [maker.id, taker.id].sort();
        return {
            marketId: sorted.join('|'),
            maker,
            makerAddress: order.signedOrder.makerAddress,
            makerAmount: order.signedOrder.makerAssetAmount,
            taker,
            takerAmount: order.signedOrder.takerAssetAmount
        };
    });
}
