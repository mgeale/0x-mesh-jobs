import { Connection, createConnection } from 'typeorm';

import { logger } from '../common/logger';
import { Config } from '../config';
import { OrdersPerMarket } from '../entities/OrdersPerMarket';
import { TotalMarkets } from '../entities/TotalMarkets';
import { TotalOrders } from '../entities/TotalOrders';
import { TotalOrdersPerMarket } from '../entities/TotalOrdersPerMarket';

let connectionIfExists: Connection | undefined;

export function getDBConnection(): Connection {
    if (!connectionIfExists) {
        throw new Error('DB connection not initialized');
    }
    return connectionIfExists;
}

export async function initDBConnectionAsync(config: Config): Promise<void> {
    if (connectionIfExists) {
        throw new Error('DB connection already exists');
    }
    connectionIfExists = await createConnection({
        type: 'postgres',
        url: config.dbConnectionString,
        synchronize: config.dbSynchronize,
        logging: config.dbLogging,
        entities: [TotalOrders, TotalMarkets, TotalOrdersPerMarket, OrdersPerMarket]
    });
    logger.info('DB connection created');
}
