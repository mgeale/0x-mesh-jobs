import { BigNumber } from '@0x/mesh-rpc-client';

import { OrderPrice } from './orderPrice';

export interface Slippage {
    price: BigNumber;
    count: BigNumber;
}

// work in progress
export function calculateSlippage(orders: OrderPrice[], purchaseAmount: number): Slippage {
    const selectedOrders = [];
    let count = new BigNumber(0);
    let price = new BigNumber(0);
    for (let i = 0; count.isLessThan(purchaseAmount); i++) {
        if (orders[i].takerAmount.plus(count).isGreaterThan(purchaseAmount)) {
            const remaining = new BigNumber(-count.minus(purchaseAmount));
            orders[i].takerAmount = remaining;
            selectedOrders.push(orders[i]);
            count = count.plus(remaining);
            price = orders[i].price.multipliedBy(remaining).plus(price);
        } else {
            selectedOrders.push(orders[i]);
            count = orders[i].takerAmount.plus(count);
            price = orders[i].price.multipliedBy(orders[i].takerAmount).plus(price);
        }
    }
    return {
        price,
        count
    };
}
