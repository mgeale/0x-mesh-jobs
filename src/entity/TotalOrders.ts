import { EntitySchema } from 'typeorm';

import { TotalOrdersModel } from '../models/TotalOrdersModel';

export const TotalOrders = new EntitySchema<TotalOrdersModel>({
    name: 'TotalOrders',
    columns: {
        timestamp: {
            primary: true,
            type: 'bigint'
        },
        totalOrders: {
            type: 'int'
        }
    }
});
