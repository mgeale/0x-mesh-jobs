import { BigNumber } from '@0x/mesh-rpc-client';

import { OrderPrice } from './orderPrice';

export interface Slippage {
    prices: BigNumber[];
    slippage: BigNumber;
    averageCost: BigNumber;
    actualCost: BigNumber;
    count: number;
}

// work in progress
export function calculateSlippage(orders: OrderPrice[], purchaseAmount: number): Slippage {
    const prices = [];
    let count = new BigNumber(0);
    let actualCost = new BigNumber(0);
    for (let i = 0; count.isLessThan(purchaseAmount); i++) {
        prices.push(orders[i].price);
        count = orders[i].makerAssetAmount.plus(count);
        actualCost = orders[i].price.multipliedBy(orders[i].makerAssetAmount).plus(actualCost);
    }
    const averageCost = actualCost.dividedBy(count);
    const slippage = prices[0].minus(averageCost);
    return {
        prices,
        slippage,
        averageCost,
        actualCost,
        count: count.toNumber()
    };
}
