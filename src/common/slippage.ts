import { BigNumber } from '@0x/mesh-rpc-client';

import { OrderPrice } from './orderPrice';

export interface Slippage {
    slippage: BigNumber;
    actualCost: BigNumber;
    filledOrders: FilledOrder[];
}

export interface FilledOrder {
    price: BigNumber;
    amount: BigNumber;
}

// work in progress
export function calculateSlippage(orders: OrderPrice[], purchaseAmount: number): Slippage {
    const filledOrders = getFilledOrders(orders, purchaseAmount);

    const actualCost = calculateTotalCostOfFilledOrders(filledOrders);
    const averagePrice = calculateAveragePriceOfFilledOrders(orders);

    const totalCostOfAveragePrice = averagePrice.multipliedBy(purchaseAmount);
    const totalCostOfBestPrice = filledOrders[0].price.multipliedBy(purchaseAmount);

    const slippage = totalCostOfBestPrice.minus(totalCostOfAveragePrice);
    return {
        slippage,
        actualCost,
        filledOrders
    };
}

export function getFilledOrders(o: OrderPrice[], purchaseAmount: number): FilledOrder[] {
    const orders = o.sort((a, b) =>
        a.price > b.price ? 1 : b.price > a.price ? -1 : 0
    );
    const filledOrders: FilledOrder[] = [];
    let count = new BigNumber(0);
    for (let i = 0; count.isLessThan(purchaseAmount); i++) {
        if (orders[i].amount.plus(count).isGreaterThan(purchaseAmount)) {
            const remaining = new BigNumber(purchaseAmount).minus(count);
            filledOrders.push({ price: orders[i].price, amount: remaining });
            count = count.plus(remaining);
        } else {
            filledOrders.push({ price: orders[i].price, amount: orders[i].amount });
            count = count.plus(orders[i].amount);
        }
    }
    return filledOrders;
}

export function calculateAveragePriceOfFilledOrders(filledOrders: FilledOrder[]): BigNumber {
    const prices = filledOrders.map(o => o.price);
    const sum = prices.reduce((total, number) => {
        return number.plus(total);
    }, new BigNumber(0));
    return sum.dividedBy(prices.length);
}

export function calculateTotalCostOfFilledOrders(filledOrders: FilledOrder[]): BigNumber {
    return filledOrders.reduce((total, number) => {
        const orderAmount = number.amount.multipliedBy(number.price);
        return orderAmount.plus(total);
    }, new BigNumber(0));
}