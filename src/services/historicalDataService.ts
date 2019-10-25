import { OrderInfo } from '@0x/mesh-rpc-client';

import { countTotalNumberOfMarkets, countTotalOrdersPerMarket } from '../common/marketTotals';
import { HistoricalDataStorage } from '../storages/historicalDataStorage';

export class HistoricalDataService {
    private readonly _storage: HistoricalDataStorage;

    constructor() {
        this._storage = new HistoricalDataStorage();
    }

    public async saveTotalOrdersAsync(orders: OrderInfo[]): Promise<void> {
        await this._storage.saveTotalOrders(orders.length);
    }

    public async saveTotalNumberOfMarketsAsync(orders: OrderInfo[]): Promise<void> {
        const totalNumberOfMarkets = countTotalNumberOfMarkets(orders);
        await this._storage.saveTotalNumberOfMarkets(totalNumberOfMarkets);
    }

    public async saveTotalOrdersPerMarketAsync(orders: OrderInfo[]): Promise<void> {
        const totalOrdersPerMarket = countTotalOrdersPerMarket(orders);
        for (const totalOrders of totalOrdersPerMarket) {
            await this._storage.saveTotalOrdersPerMarketAsync(totalOrders);
        }
    }

    public async saveOrdersPerMarket() {}
}
