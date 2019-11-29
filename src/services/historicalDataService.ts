import { OrderInfo } from '@0x/mesh-rpc-client';

import { countTotalNumberOfMarkets, countTotalOrdersPerMarket } from '../common/marketTotals';
import { getOrdersPerMarket } from '../common/orders';
import {
    saveOrdersPerMarketAsync,
    saveTotalNumberOfMarketsAsync,
    saveTotalOrdersAsync,
    saveTotalOrdersPerMarketAsync
} from '../storages/historicalDataStorage';

export class HistoricalDataService {
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
}
