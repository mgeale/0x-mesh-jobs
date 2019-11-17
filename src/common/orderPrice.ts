import { BigNumber, SignedOrder } from '@0x/mesh-rpc-client';

export interface OrderPrice extends SignedOrder {
    price: BigNumber;
    makerAmount: BigNumber;
    takerAmount: BigNumber;
}

export function toOrderPrice(signedOrders: SignedOrder[]): OrderPrice[] {
    return signedOrders.map(o => {
        return {
            ...o,
            price: o.makerAssetAmount.dividedBy(o.takerAssetAmount),
            makerAmount: o.makerAssetAmount.shiftedBy(-18),
            takerAmount: o.takerAssetAmount.shiftedBy(-18)
        };
    });
}
