import { OrderInfo } from '@0x/mesh-rpc-client';

import { TokenData } from '../lib/tokenData';
import { getMeshConnection } from '../meshConnection';
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
        const marketOrder = [];
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
                    takerAmount: o.signedOrder.takerAssetAmount.shiftedBy(-18),
                });
            }
        });
        return marketOrder.sort((a, b) => b.price - a.price);
    }
}
