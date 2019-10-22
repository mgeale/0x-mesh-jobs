import { OrderInfo } from '@0x/mesh-rpc-client';

import { OrderPrice } from '../models/OrderModels';

export function toOrderPrice(orders: OrderInfo[]): OrderPrice[] {
    const marketOrder = [];
    orders.forEach(o => {
        marketOrder.push({
            ...o.signedOrder,
            price: o.signedOrder.makerAssetAmount.dividedBy(o.signedOrder.takerAssetAmount),
            makerAmount: o.signedOrder.makerAssetAmount.shiftedBy(-18),
            takerAmount: o.signedOrder.takerAssetAmount.shiftedBy(-18),
        });
    });
    return marketOrder.sort((a, b) => b.price - a.price);
}
