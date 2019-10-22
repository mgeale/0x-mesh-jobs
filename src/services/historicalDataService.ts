import { OrderInfo } from '@0x/mesh-rpc-client';
import { HistoricalDataStorage } from '../storages/historicalDataStorage';
import { MarketTotals } from '../common/marketTotals';

export class HistoricalDataService {
    private readonly _storage: HistoricalDataStorage;

    constructor() {
        this._storage = new HistoricalDataStorage();
    }

    public async saveTotalOrdersAsync(orders: OrderInfo[]): Promise<void> {
        await this._storage.saveTotalOrders(orders.length);
    }

    public async saveTotalNumberOfMarketsAsync(orders: OrderInfo[]): Promise<void> {
        const totalNumberOfMarkets = MarketTotals.calculateTotalNumberOfMarkets(orders);
        // TODO: add storage
    }

    public async saveTotalOrdersPerMarketAsync(orders: OrderInfo[]): Promise<void> {
        const totalOrdersPerMarket = MarketTotals.calculateTotalOrdersPerMarket(orders);
        // TODO: add storage
    }
}
