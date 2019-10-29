import { EntitySchema } from 'typeorm';

import { TotalMarketsModel } from '../models/TotalMarketsModel';

export const TotalMarkets = new EntitySchema<TotalMarketsModel>({
    name: 'TotalMarkets',
    columns: {
        timestamp: {
            primary: true,
            type: 'bigint'
        },
        totalMarkets: {
            type: 'int'
        }
    }
});
