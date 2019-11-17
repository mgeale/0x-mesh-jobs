import { Connection, createConnection } from 'typeorm';

import { Config } from '../config';
import { logger } from '../common/logger';
import { OrdersPerMarket } from '../entity/OrdersPerMarket';
import { TotalMarkets } from '../entity/TotalMarkets';
import { TotalOrders } from '../entity/TotalOrders';
import { TotalOrdersPerMarket } from '../entity/TotalOrdersPerMarket';

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
        url: config.postgresConnectionUrl,
        synchronize: true,
        logging: true,
        entities: [TotalOrders, TotalMarkets, TotalOrdersPerMarket, OrdersPerMarket]
    });
    logger.info('DB connection created');
}
