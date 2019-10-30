import { OrderInfo } from '@0x/mesh-rpc-client';

import { countTotalNumberOfMarkets, countTotalOrdersPerMarket, getOrdersPerMarket } from '../common/marketTotals';
import { TimeUnitType } from '../common/timeUnit/timeUnit';
import { TimeUnitFactory } from '../common/timeUnit/timeUnitFactory';
import { HistoricalDataStorage } from '../storages/historicalDataStorage';
import { TotalOrdersModel } from '../models/TotalOrdersModel';

export class HistoricalDataService {
    private readonly _storage: HistoricalDataStorage;

    constructor() {
        this._storage = new HistoricalDataStorage();
    }

    public async saveTotalOrdersAsync(orders: OrderInfo[]): Promise<void> {
        await this._storage.saveTotalOrdersAsync(orders.length);
    }

    public async saveTotalNumberOfMarketsAsync(orders: OrderInfo[]): Promise<void> {
        const totalNumberOfMarkets = countTotalNumberOfMarkets(orders);
        await this._storage.saveTotalNumberOfMarketsAsync(totalNumberOfMarkets);
    }

    public async saveTotalOrdersPerMarketAsync(orders: OrderInfo[]): Promise<void> {
        const totalOrdersPerMarket = countTotalOrdersPerMarket(orders);
        for (const o of totalOrdersPerMarket) {
            await this._storage.saveTotalOrdersPerMarketAsync(o);
        }
    }

    public async saveOrdersPerMarketAsync(orders: OrderInfo[]): Promise<void> {
        const ordersPerMarket = getOrdersPerMarket(orders);
        for (const o of ordersPerMarket) {
            await this._storage.saveOrdersPerMarketAsync(o);
        }
    }

    public async getTotalOrdersAsync(timeUnitType: TimeUnitType, count: number) {
        const timeUnit = TimeUnitFactory.createTimeUnit(timeUnitType);
        const timeline = timeUnit.createTimeline(count);
        const startTime = new Date(timeline[0]).getTime();
        const endTime = new Date().getTime();
        const totals = await this._storage.getTotalOrdersAsync(startTime, endTime);
        return this.createRateTimeline(totals, timeline);
    }

    private createRateTimeline(marketData: TotalOrdersModel[], timeline: Date[]): number[] {
        return timeline.map(timePoint => {
            const closestDate = marketData.sort((a, b) => {
                const distanceA = Math.abs(timePoint.getTime() - a.timestamp);
                const distanceB = Math.abs(timePoint.getTime() - b.timestamp);
                return distanceA - distanceB;
            });
            return closestDate[0].totalOrders;
        });
    }
}
