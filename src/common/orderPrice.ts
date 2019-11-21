import { BigNumber, SignedOrder } from '@0x/mesh-rpc-client';

export interface OrderPrice extends SignedOrder {
    price: BigNumber;
    amount: BigNumber;
}

// work in progress
export function getAskOrderPrice(signedOrders: SignedOrder[]): OrderPrice[] {
    return signedOrders.map(o => {
        return {
            ...o,
            price: o.takerAssetAmount.dividedBy(o.makerAssetAmount),
            amount: o.makerAssetAmount
        };
    });
}

export function getBidOrderPrice(signedOrders: SignedOrder[]): OrderPrice[] {
    return signedOrders.map(o => {
        return {
            ...o,
            price: o.makerAssetAmount.dividedBy(o.takerAssetAmount),
            amount: o.takerAssetAmount
        };
    });
}
