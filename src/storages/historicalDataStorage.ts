import { getRepository, Repository } from 'typeorm';
import { initDBConnectionAsync } from '../connections/dbConnection';

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
    private totalOrdersRepository: Repository<TotalOrdersModel>;
    private totalMarketsRepository: Repository<TotalMarketsModel>;
    private totalOrdersPerMarketRepository: Repository<TotalOrdersPerMarketModel>;
    private ordersPerMarketRepository: Repository<OrdersPerMarketModel>;

    constructor() {
        this.totalOrdersRepository = getRepository(TotalOrders);
        console.log(this.totalOrdersRepository)
        this.totalMarketsRepository = getRepository(TotalMarkets);
        this.totalOrdersPerMarketRepository = getRepository(TotalOrdersPerMarket);
        this.ordersPerMarketRepository = getRepository(OrdersPerMarket);
    }

    public async saveTotalOrders(total: number) {
        const entry = new TotalOrdersModel({
            timestamp: new Date().getTime(),
            totalOrders: total
        });
        await this.totalOrdersRepository.save(entry);
    }

    public async saveTotalNumberOfMarkets(total: number) {
        const entry = new TotalMarketsModel({
            timestamp: new Date().getTime(),
            totalMarkets: total
        });
        await this.totalMarketsRepository.save(entry);
    }

    public async saveTotalOrdersPerMarketAsync(totalMarketOrders: TotalMarketOrders) {
        const entry = new TotalOrdersPerMarketModel({
            marketId: totalMarketOrders.marketId,
            timestamp: new Date().getTime(),
            totalOrders: totalMarketOrders.totalOrders
        });
        await this.totalOrdersPerMarketRepository.save(entry);
    }

    public async saveOrdersPerMarketAsync(marketOrders: MarketOrders) {
        const entry = new OrdersPerMarketModel({
            marketId: marketOrders.marketId,
            timestamp: new Date().getTime(),
            orders: marketOrders.orders
        });
        await this.ordersPerMarketRepository.save(entry);
    }
}
