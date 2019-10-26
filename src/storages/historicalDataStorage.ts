import { getRepository } from 'typeorm';

import { MarketOrders, TotalMarketOrders } from '../common/marketTotals';
import { OrdersPerMarket } from '../entity/OrdersPerMarket';
import { TotalMarkets } from '../entity/TotalMarkets';
import { TotalOrders } from '../entity/TotalOrders';
import { TotalOrderPerMarket } from '../entity/TotalOrdersPerMarket';
import { OrdersPerMarketModel } from '../models/OrdersPerMarketModel';
import { TotalMarketsModel } from '../models/TotalMarketsModel';
import { TotalOrdersModel } from '../models/totalOrdersModel';
import { TotalOrderPerMarketModel } from '../models/TotalOrdersPerMarketModel';

export class HistoricalDataStorage {
    constructor() {}

    public async saveTotalOrders(total: number) {
        const entry = new TotalOrdersModel({
            timestamp: new Date().getTime(),
            totalOrders: total,
        });
        const totalOrdersRepository = getRepository(TotalOrders);
        await totalOrdersRepository.save(entry);
    }

    public async saveTotalNumberOfMarkets(total: number) {
        const entry = new TotalMarketsModel({
            timestamp: new Date().getTime(),
            totalMarkets: total,
        });
        const totalMarketsRepository = getRepository(TotalMarkets);
        await totalMarketsRepository.save(entry);
    }

    public async saveTotalOrdersPerMarketAsync(totalMarketOrders: TotalMarketOrders) {
        const entry = new TotalOrderPerMarketModel({
            marketId: totalMarketOrders.marketId,
            timestamp: new Date().getTime(),
            totalOrders: totalMarketOrders.totalOrders
        })
        const totalOrdersPerMarketRepository = getRepository(TotalOrderPerMarket);
        await totalOrdersPerMarketRepository.save(entry);
    }

    public async saveOrdersPerMarketAsync(marketOrders: MarketOrders) {
        const entry = new OrdersPerMarketModel({
            marketId: marketOrders.marketId,
            timestamp: new Date().getTime(),
            orders: marketOrders.orders
        });
        const orderPerMarketRepository = getRepository(OrdersPerMarket);
        await orderPerMarketRepository.save(entry);
    }
}
