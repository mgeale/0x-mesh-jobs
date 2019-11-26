import { EntitySchema } from 'typeorm';

import { TotalOrdersPerMarketModel } from '../models/TotalOrdersPerMarketModel';
import { bigint } from './transformer';

export const TotalOrdersPerMarket = new EntitySchema<TotalOrdersPerMarketModel>({
    name: 'TotalOrdersPerMarket',
    columns: {
        timestamp: {
            primary: true,
            type: 'bigint',
            transformer: [bigint]
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
