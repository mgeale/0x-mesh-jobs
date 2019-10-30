import { Between, getManager, getRepository, Repository } from 'typeorm';

import { MarketOrders, TotalMarketOrders } from '../common/marketTotals';
import { OrdersPerMarket } from '../entity/OrdersPerMarket';
import { TotalMarkets } from '../entity/TotalMarkets';
import { TotalOrders } from '../entity/TotalOrders';
import { TotalOrdersPerMarket } from '../entity/TotalOrdersPerMarket';
import { OrdersPerMarketModel } from '../models/OrdersPerMarketModel';
import { TotalMarketsModel } from '../models/TotalMarketsModel';
import { TotalOrdersModel } from '../models/totalOrdersModel';
import { TotalOrdersPerMarketModel } from '../models/TotalOrdersPerMarketModel';

export class HistoricalDataStorage {
    private readonly _totalOrdersRepository: Repository<TotalOrdersModel>;
    private readonly _totalMarketsRepository: Repository<TotalMarketsModel>;
    private readonly _totalOrdersPerMarketRepository: Repository<TotalOrdersPerMarketModel>;
    private readonly _ordersPerMarketRepository: Repository<OrdersPerMarketModel>;

    constructor() {
        // this._totalOrdersRepository = getRepository(TotalOrders);
        // this._totalMarketsRepository = getRepository(TotalMarkets);
        // this._totalOrdersPerMarketRepository = getRepository(TotalOrdersPerMarket);
        // this._ordersPerMarketRepository = getRepository(OrdersPerMarket);
    }

    public async saveTotalOrdersAsync(total: number): Promise<void> {
        const entry = new TotalOrdersModel({
            timestamp: new Date().getTime(),
            totalOrders: total
        });
        await this._totalOrdersRepository.save(entry);
    }

    public async saveTotalNumberOfMarketsAsync(total: number): Promise<void> {
        const entry = new TotalMarketsModel({
            timestamp: new Date().getTime(),
            totalMarkets: total
        });
        await this._totalMarketsRepository.save(entry);
    }

    public async saveTotalOrdersPerMarketAsync(totalMarketOrders: TotalMarketOrders): Promise<void> {
        const entry = new TotalOrdersPerMarketModel({
            marketId: totalMarketOrders.marketId,
            timestamp: new Date().getTime(),
            totalOrders: totalMarketOrders.totalOrders
        });
        await this._totalOrdersPerMarketRepository.save(entry);
    }

    public async saveOrdersPerMarketAsync(marketOrders: MarketOrders): Promise<void> {
        const entry = new OrdersPerMarketModel({
            marketId: marketOrders.marketId,
            timestamp: new Date().getTime(),
            orders: marketOrders.orders
        });
        await this._ordersPerMarketRepository.save(entry);
    }

    public async getTotalOrdersAsync(start: number, finish: number): Promise<TotalOrdersModel[]> {
        return this._totalOrdersRepository.find({
            timestamp: Between(start, finish)
        });
    }
}
