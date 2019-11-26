import { EntitySchema } from 'typeorm';

import { TotalOrdersModel } from '../models/TotalOrdersModel';
import { bigint } from './transformer';

export const TotalOrders = new EntitySchema<TotalOrdersModel>({
    name: 'TotalOrders',
    columns: {
        timestamp: {
            primary: true,
            type: 'bigint',
            transformer: [bigint]
        },
        totalOrders: {
            type: 'int'
        }
    }
});
