import { OrderInfo } from '@0x/mesh-rpc-client';

import { countTotalNumberOfMarkets, countTotalOrdersPerMarket, getOrdersPerMarket } from '../common/marketTotals';
import { TokenData } from '../common/tokenData';
import { createTimeline, createTotalOrdersTimeline, TimeUnitType } from '../common/timeline';
import {
    saveOrdersPerMarketAsync,
    saveTotalNumberOfMarketsAsync,
    saveTotalOrdersAsync,
    saveTotalOrdersPerMarketAsync,
    getTotalOrdersPerMarketAsync
} from '../storages/historicalDataStorage';

export class HistoricalDataService {
    private tokenData: TokenData;

    public static async saveTotalOrdersAsync(orders: OrderInfo[]): Promise<void> {
        await saveTotalOrdersAsync(orders.length);
    }

    public static async saveTotalNumberOfMarketsAsync(orders: OrderInfo[]): Promise<void> {
        const totalNumberOfMarkets = countTotalNumberOfMarkets(orders);
        await saveTotalNumberOfMarketsAsync(totalNumberOfMarkets);
    }

    public static async saveTotalOrdersPerMarketAsync(orders: OrderInfo[]): Promise<void> {
        const totalOrdersPerMarket = countTotalOrdersPerMarket(orders);
        for (const o of totalOrdersPerMarket) {
            await saveTotalOrdersPerMarketAsync(o);
        }
    }

    public static async saveOrdersPerMarketAsync(orders: OrderInfo[]): Promise<void> {
        const ordersPerMarket = getOrdersPerMarket(orders);
        for (const o of ordersPerMarket) {
            await saveOrdersPerMarketAsync(o);
        }
    }

    constructor() {
        this.tokenData = new TokenData();
    }

    // work in progress
    public async getTotalOrdersPerMarketAsync(makerAssetSymbol: string, takerAssetSymbol: string, timeUnitType: TimeUnitType, count: number) {
        const makerTokenAddress = this.tokenData.toTokenAddress(makerAssetSymbol);
        if (!makerTokenAddress) {
            throw Error('maker token address cannot be found');
        }
        const takerTokenAddress = this.tokenData.toTokenAddress(takerAssetSymbol);
        if (!takerTokenAddress) {
            throw Error('taker token address cannot be found');
        }
        const marketId = [makerTokenAddress, takerTokenAddress].sort().join('|');
        const timeline = createTimeline(timeUnitType, count);
        const orders = await getTotalOrdersPerMarketAsync(marketId, timeline[0].getTime(), timeline[timeline.length-1].getTime());
        return createTotalOrdersTimeline(timeUnitType, orders, timeline);
    }
}
