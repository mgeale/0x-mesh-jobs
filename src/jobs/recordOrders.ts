import { HistoricalDataService } from '../services/historicalDataService';
import { getDBConnection, initDBConnectionAsync } from '../connections/dbConnection';
import { getMeshConnection, initMeshConnectionAsync } from '../connections/meshConnection';
import { logger } from '../common/logger';
import { Config } from '../config';

export async function initOrderRecord(config: Config) {
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
    await historicalDataService.saveOrdersPerMarket(orders);

    meshConnection.destroy();
    logger.info('mesh connection destroyed');
    const dbConnection = getDBConnection();
    dbConnection.close();
    logger.info('db connection closed');
}
