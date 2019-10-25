import { Connection, getRepository } from 'typeorm';
import { getDBConnection } from '../connections/dbConnection';
import { TotalOrdersModel } from '../models/totalOrdersModel';
import { TotalMarketsModel } from '../models/TotalMarketsModel';
import { TotalMarketOrders } from '../common/marketTotals';
import { TotalOrders } from '../entity/TotalOrders';
import { TotalMarkets } from '../entity/TotalMarkets';

export class HistoricalDataStorage {
    constructor() {}

    public async saveTotalOrders(total: number) {
        const entry = new TotalOrdersModel({
            timestamp: new Date().getTime(),
            totalOrders: total
        });
        const totalOrdersRepository = getRepository(TotalOrders);
        await totalOrdersRepository.save(entry);
    }

    public async saveTotalNumberOfMarkets(total: number) {
        const entry = new TotalMarketsModel({
            timestamp: new Date().getTime(),
            totalMarkets: total
        });
        const totalMarketsRepository = getRepository(TotalMarkets);
        await totalMarketsRepository.save(entry);
    }

    public async saveTotalOrdersPerMarketAsync(totalMarketOrders: TotalMarketOrders) {}
}
