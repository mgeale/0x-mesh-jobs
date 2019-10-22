import { OrderInfo } from '@0x/mesh-rpc-client';

import { TokenData } from '../common/tokenData';
import { getMeshConnection } from '../connections/meshConnection';
import { OrderPrice } from '../models/OrderModels';
import { toOrderPrice } from '../common/orderPrice';

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
        const orderPrices = toOrderPrice(orders);
        //TODO finish
        return orderPrices;
    }
}
