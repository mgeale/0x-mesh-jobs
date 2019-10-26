import { EntitySchema } from 'typeorm';

import { OrdersPerMarketModel } from '../models/OrdersPerMarketModel';

export const OrdersPerMarket = new EntitySchema<OrdersPerMarketModel>({
    name: 'OrdersPerMarket',
    columns: {
        timestamp: {
            primary: true,
            type: 'bigint',
        },
        marketId: {
			primary: true,
			type: String,
        },
        orders: {
            type: 'array'
        },
    }
});