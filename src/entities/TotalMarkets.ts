import { EntitySchema } from 'typeorm';

import { TotalMarketsModel } from '../models/TotalMarketsModel';
import { bigint } from './transformer';

export const TotalMarkets = new EntitySchema<TotalMarketsModel>({
    name: 'TotalMarkets',
    columns: {
        timestamp: {
            primary: true,
            type: 'bigint',
            transformer: [bigint]
        },
        totalMarkets: {
            type: 'int'
        }
    }
});
