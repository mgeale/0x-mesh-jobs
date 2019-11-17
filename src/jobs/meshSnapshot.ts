import { logger } from '../common/logger';
import { Config } from '../config';
import { getMeshConnection } from '../connections/meshConnection';
import { HistoricalDataService } from '../services/historicalDataService';

export async function meshSnapshot(config: Config) {
    const meshConnection = getMeshConnection();
    const orders = await meshConnection.getOrdersAsync();

    let historicalDataService: HistoricalDataService;
    historicalDataService = new HistoricalDataService();
    await historicalDataService.saveTotalOrdersAsync(orders);
    await historicalDataService.saveTotalNumberOfMarketsAsync(orders);
    await historicalDataService.saveTotalOrdersPerMarketAsync(orders);
    await historicalDataService.saveOrdersPerMarketAsync(orders);
    logger.info('Mesh snapshot saved to DB');
}
