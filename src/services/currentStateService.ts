import { OrderInfo } from '@0x/mesh-rpc-client';
import { BigNumber } from 'bignumber.js';

import { getMeshConnection } from '../meshConnection';
import { TokenData } from '../lib/tokenData';
import { OrderPrice } from '../models/OrderModels';

export class CurrentStateService {
    public tokenData: TokenData;

    constructor() {
        this.tokenData = new TokenData();
    }

    public async countMarketsAsync(orders: OrderInfo[]) {
        const markets = orders.map(o => {
            return [o.signedOrder.makerAssetData, o.signedOrder.takerAssetData];
        });
        const uniqueMarkets = [...new Set(markets)];
        const marketSymbols = uniqueMarkets.map(m => {
            return [this.tokenData.toTokenSymbol(m[0]), this.tokenData.toTokenSymbol(m[1])];
        });
        console.log(marketSymbols);
    }

    public async countMakersAsync(orders: OrderInfo[]) {
        const makers = orders.map(o => {
            return o.signedOrder.makerAddress;
        });
        const uniqueMakers = [...new Set(makers)];
        console.log(uniqueMakers);
    }

    public async getOrderBookAsync(market: { makerAsset: string; takerAsset: string }): Promise<OrderPrice[]> {
        const meshConnection = getMeshConnection();
        const orders = await meshConnection.getOrdersAsync();
        let marketOrder = [];
        orders.forEach(o => {
            if (
                o.signedOrder.makerAssetData === market.makerAsset &&
                o.signedOrder.takerAssetData === market.takerAsset
            ) {
                marketOrder.push({
                    ...o.signedOrder,
                    makerToken: this.tokenData.toTokenSymbol(o.signedOrder.makerAssetData),
                    takerToken: this.tokenData.toTokenSymbol(o.signedOrder.takerAssetData),
                    price: o.signedOrder.makerAssetAmount.dividedBy(o.signedOrder.takerAssetAmount),
                    makerAmount: o.signedOrder.makerAssetAmount.shiftedBy(-18),
                    takerAmount: o.signedOrder.takerAssetAmount.shiftedBy(-18)
                });
            }
        });
        return marketOrder.sort((a, b) => b.price - a.price);
    }

    public getSlippage(orders: OrderPrice[], purchaseAmount: number) {
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
            price: price,
            count: count
        };
    }
}
