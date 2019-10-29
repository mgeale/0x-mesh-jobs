import { EntitySchema } from 'typeorm';

import { TotalOrdersPerMarketModel } from '../models/TotalOrdersPerMarketModel';

export const TotalOrdersPerMarket = new EntitySchema<TotalOrdersPerMarketModel>({
    name: 'TotalOrdersPerMarket',
    columns: {
        timestamp: {
            primary: true,
            type: 'bigint'
        },
        marketId: {
            primary: true,
            type: String
        },
        totalOrders: {
            type: 'int'
        }
    }
});
