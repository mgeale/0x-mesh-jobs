import { logger } from '../common/logger';
import { Config } from '../config';
import { getDBConnection, initDBConnectionAsync } from '../connections/dbConnection';
import { getMeshConnection, initMeshConnectionAsync } from '../connections/meshConnection';
import { HistoricalDataService } from '../services/historicalDataService';

export async function meshSnapshot(config: Config) {
    await initMeshConnectionAsync(config);
    logger.info('mesh connection created');
    await initDBConnectionAsync(config);
    logger.info('db connection created');

    const meshConnection = getMeshConnection();
    const orders = await meshConnection.getOrdersAsync();
    logger.info('mesh orders received');

    let historicalDataService: HistoricalDataService;
    historicalDataService = new HistoricalDataService();
    await historicalDataService.saveTotalOrdersAsync(orders);
    await historicalDataService.saveTotalNumberOfMarketsAsync(orders);
    await historicalDataService.saveTotalOrdersPerMarketAsync(orders);
    await historicalDataService.saveOrdersPerMarketAsync(orders);

    //meshConnection.close();
    //logger.info('mesh connection destroyed');
    const dbConnection = getDBConnection();
    dbConnection.close();
    logger.info('db connection closed');
}
