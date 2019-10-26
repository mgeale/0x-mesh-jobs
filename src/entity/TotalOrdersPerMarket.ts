import { EntitySchema } from 'typeorm';

import { TotalOrderPerMarketModel } from '../models/TotalOrdersPerMarketModel';

export const TotalOrderPerMarket = new EntitySchema<TotalOrderPerMarketModel>({
    name: 'TotalOrderPerMarket',
    columns: {
        timestamp: {
            primary: true,
            type: 'bigint',
        },
        marketId: {
			primary: true,
			type: String,
        },
        totalOrders: {
            type: 'int',
        },
    }
});