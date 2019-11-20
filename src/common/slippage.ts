import { BigNumber } from '@0x/mesh-rpc-client';

import { OrderPrice } from './orderPrice';

export interface Slippage {
    actualCost: BigNumber;
    averageCost: BigNumber;
    slippage: BigNumber;
    count: number;
}

// work in progress
export function calculateSlippage(orders: OrderPrice[], purchaseAmount: number): Slippage {
    const usedOrders = [];
    let count = new BigNumber(0);
    let actualCost = new BigNumber(0);
    for (let i = 0; count.isLessThan(purchaseAmount); i++) {
        if (orders[i].makerAssetAmount.plus(count).isGreaterThan(purchaseAmount)) {
            const remaining = new BigNumber(purchaseAmount).minus(count);
            usedOrders.push(orders[i]);
            count = count.plus(remaining);
            actualCost = orders[i].price.multipliedBy(remaining).plus(actualCost);
        } else {
            usedOrders.push(orders[i]);
            count = orders[i].makerAssetAmount.plus(count);
            actualCost = orders[i].price.multipliedBy(orders[i].makerAssetAmount).plus(actualCost);
        }
    }
    const costsPerOrder = usedOrders.map(o => o.price).sort();
    const averageCost = actualCost.dividedBy(count);
    const slippage = costsPerOrder[0].minus(averageCost);
    return {
        actualCost,
        averageCost,
        slippage,
        count: count.toNumber()
    };
}
