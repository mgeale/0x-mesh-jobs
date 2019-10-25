import * as _ from 'lodash';
import { Connection, createConnection } from 'typeorm';

import { Config } from '../config';
import { TotalMarkets } from '../entity/TotalMarkets';
import { TotalOrders } from '../entity/TotalOrders';

let connectionIfExists: Connection | undefined;

export function getDBConnection(): Connection {
    if (_.isUndefined(connectionIfExists)) {
        throw new Error('DB connection not initialized');
    }
    return connectionIfExists;
}

export async function initDBConnectionAsync(config?: Config): Promise<void> {
    if (!_.isUndefined(connectionIfExists)) {
        throw new Error('DB connection already exists');
    }
    connectionIfExists = await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        synchronize: true,
        logging: true,
        entities: [TotalOrders, TotalMarkets],
    });
}
