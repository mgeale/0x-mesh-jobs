import { getRepository } from 'typeorm';

import { TotalMarketOrders } from '../common/marketTotals';
import { MarketOrders } from '../common/orders';
import { OrdersPerMarket } from '../entities/OrdersPerMarket';
import { TotalMarkets } from '../entities/TotalMarkets';
import { TotalOrders } from '../entities/TotalOrders';
import { TotalOrdersPerMarket } from '../entities/TotalOrdersPerMarket';
import { OrdersPerMarketModel } from '../models/OrdersPerMarketModel';
import { TotalMarketsModel } from '../models/TotalMarketsModel';
import { TotalOrdersModel } from '../models/TotalOrdersModel';
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
