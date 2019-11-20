import { BigNumber, SignedOrder } from '@0x/mesh-rpc-client';

export interface OrderPrice extends SignedOrder {
    price: BigNumber;
}

export function toOrderPrice(signedOrders: SignedOrder[]): OrderPrice[] {
    return signedOrders.map(o => {
        return {
            ...o,
            price: o.takerAssetAmount.dividedBy(o.makerAssetAmount)
        };
    });
}
