import { getRepository } from 'typeorm';

import { TotalMarketOrders } from '../common/marketTotals';
import { TotalMarkets } from '../entity/TotalMarkets';
import { TotalOrders } from '../entity/TotalOrders';
import { TotalMarketsModel } from '../models/TotalMarketsModel';
import { TotalOrdersModel } from '../models/totalOrdersModel';

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

    public async saveTotalOrdersPerMarketAsync(totalMarketOrders: TotalMarketOrders) {}
}
