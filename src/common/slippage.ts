import { BigNumber } from '@0x/mesh-rpc-client';

import { OrderPrice } from './orderPrice';

export interface Slippage {
    cost: BigNumber;
    count: number;
}

// work in progress
export function calculateSlippage(orders: OrderPrice[], purchaseAmount: number): Slippage {
    let count = new BigNumber(0);
    let cost = new BigNumber(0);
    for (let i = 0; count.isLessThan(purchaseAmount); i++) {
        if (orders[i].takerAssetAmount.plus(count).isGreaterThan(purchaseAmount)) {
            const remaining = new BigNumber(purchaseAmount).minus(count);
            count = count.plus(remaining);
            cost = orders[i].price.multipliedBy(remaining).plus(cost);
        } else {
            count = orders[i].takerAssetAmount.plus(count);
            cost = orders[i].price.multipliedBy(orders[i].takerAssetAmount).plus(cost);
        }
    }
    return {
        cost,
        count: count.toNumber()
    };
}
