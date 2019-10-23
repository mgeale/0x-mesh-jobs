import { SignedOrder } from '@0x/types';

import { OrderPrice } from '../models/OrderModels';

export function toOrderPrice(orders: SignedOrder[]): OrderPrice[] {
    return orders.map(o => {
        return {
            ...o,
            price: o.makerAssetAmount.dividedBy(o.takerAssetAmount),
            makerAmount: o.makerAssetAmount.shiftedBy(-18),
            takerAmount: o.takerAssetAmount.shiftedBy(-18)
        };
    });
}
