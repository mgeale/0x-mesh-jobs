import { logger } from '../common/logger';
import { Config } from '../config';
import { getMeshConnection } from '../connections/meshConnection';
import { HistoricalDataService } from '../services/historicalDataService';

export async function meshSnapshot(config: Config): Promise<void> {
    const meshConnection = getMeshConnection();
    const orders = await meshConnection.getOrdersAsync();

    await HistoricalDataService.saveTotalOrdersAsync(orders);
    await HistoricalDataService.saveTotalNumberOfMarketsAsync(orders);
    await HistoricalDataService.saveTotalOrdersPerMarketAsync(orders);
    await HistoricalDataService.saveOrdersPerMarketAsync(orders);
    logger.info('Mesh snapshot saved to DB');
}
