import { EntitySchema } from 'typeorm';

import { OrdersPerMarketModel } from '../models/OrdersPerMarketModel';

import { bigint } from './transformer';

export const OrdersPerMarket = new EntitySchema<OrdersPerMarketModel>({
    name: 'OrdersPerMarket',
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
        orders: {
            type: String,
            array: true
        }
    }
});
