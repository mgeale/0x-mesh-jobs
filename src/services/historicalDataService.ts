import { OrderInfo } from '@0x/mesh-rpc-client';

import { countTotalNumberOfMarkets, countTotalOrdersPerMarket, getOrdersPerMarket } from '../common/marketTotals';
import { saveTotalOrdersAsync, saveTotalNumberOfMarketsAsync, saveTotalOrdersPerMarketAsync, saveOrdersPerMarketAsync } from '../storages/historicalDataStorage';
import { TotalOrdersModel } from '../models/TotalOrdersModel';

export class HistoricalDataService {
    constructor() {}

    public async saveTotalOrdersAsync(orders: OrderInfo[]): Promise<void> {
        await saveTotalOrdersAsync(orders.length);
    }

    public async saveTotalNumberOfMarketsAsync(orders: OrderInfo[]): Promise<void> {
        const totalNumberOfMarkets = countTotalNumberOfMarkets(orders);
        await saveTotalNumberOfMarketsAsync(totalNumberOfMarkets);
    }

    public async saveTotalOrdersPerMarketAsync(orders: OrderInfo[]): Promise<void> {
        const totalOrdersPerMarket = countTotalOrdersPerMarket(orders);
        for (const o of totalOrdersPerMarket) {
            await saveTotalOrdersPerMarketAsync(o);
        }
    }

    public async saveOrdersPerMarketAsync(orders: OrderInfo[]): Promise<void> {
        const ordersPerMarket = getOrdersPerMarket(orders);
        for (const o of ordersPerMarket) {
            await saveOrdersPerMarketAsync(o);
        }
    }
}
