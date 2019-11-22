import { Between, getRepository } from 'typeorm';

import { MarketOrders, TotalMarketOrders } from '../common/marketTotals';
import { OrdersPerMarket } from '../entity/OrdersPerMarket';
import { TotalMarkets } from '../entity/TotalMarkets';
import { TotalOrders } from '../entity/TotalOrders';
import { TotalOrdersPerMarket } from '../entity/TotalOrdersPerMarket';
import { OrdersPerMarketModel } from '../models/OrdersPerMarketModel';
import { TotalMarketsModel } from '../models/TotalMarketsModel';
import { TotalOrdersModel } from '../models/totalOrdersModel';
import { TotalOrdersPerMarketModel } from '../models/TotalOrdersPerMarketModel';

export async function saveTotalOrdersAsync(total: number): Promise<void> {
    const entry = new TotalOrdersModel({
        timestamp: new Date().getTime(),
        totalOrders: total
    });
    await getRepository(TotalOrders).save(entry);
}

export async function saveTotalNumberOfMarketsAsync(total: number): Promise<void> {
    const entry = new TotalMarketsModel({
        timestamp: new Date().getTime(),
        totalMarkets: total
    });
    await getRepository(TotalMarkets).save(entry);
}

export async function saveTotalOrdersPerMarketAsync(totalMarketOrders: TotalMarketOrders): Promise<void> {
    const entry = new TotalOrdersPerMarketModel({
        marketId: totalMarketOrders.marketId,
        timestamp: new Date().getTime(),
        totalOrders: totalMarketOrders.totalOrders
    });
    await getRepository(TotalOrdersPerMarket).save(entry);
}

export async function saveOrdersPerMarketAsync(marketOrders: MarketOrders): Promise<void> {
    const entry = new OrdersPerMarketModel({
        marketId: marketOrders.marketId,
        timestamp: new Date().getTime(),
        orders: marketOrders.orders
    });
    await getRepository(OrdersPerMarket).save(entry);
}

export async function getTotalOrdersAsync(start: number, finish: number): Promise<TotalOrdersModel[]> {
    return getRepository(TotalOrders).find({
        timestamp: Between(start, finish)
    });
}

export async function getTotalOrdersPerMarketAsync(marketId: string, start: number, finish: number): Promise<TotalOrdersModel[]> {
    return getRepository(TotalOrdersPerMarket).find({
        marketId,
        timestamp: Between(start, finish)
    });
}
