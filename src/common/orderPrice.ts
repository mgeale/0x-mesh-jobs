import { BigNumber, SignedOrder } from '@0x/mesh-rpc-client';

import { MarketOrders } from './marketTotals';

export interface OrderPrice extends SignedOrder {
    price: BigNumber;
    makerAmount: BigNumber;
    takerAmount: BigNumber;
}

export function calculateOrderPriceForTaker(
    makerAssetToPurchase: string,
    makerAmountToPurchase: number,
    marketOrders: MarketOrders
) {
    const assets = marketOrders.marketId.split('|');
    const makerPosition = makerAssetToPurchase === assets[0] ? 0 : 1;
    const orders = marketOrders.orders[makerPosition];
    console.log(marketOrders);
}

export function toOrderPrice(signedOrders: SignedOrder[]): OrderPrice[] {
    const n = -18;
    return signedOrders.map(o => {
        return {
            ...o,
            price: o.makerAssetAmount.dividedBy(o.takerAssetAmount),
            makerAmount: o.makerAssetAmount.shiftedBy(n),
            takerAmount: o.takerAssetAmount.shiftedBy(n)
        };
    });
}
