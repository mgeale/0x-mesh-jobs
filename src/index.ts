import * as path from 'path';
import 'reflect-metadata';
import { Config } from './config';
import { HistoricalDataService } from './services/historicalDataService';
import { getMeshConnection, initMeshConnectionAsync } from './connections/meshConnection';
import { initDBConnectionAsync, getDBConnection } from './connections/dbConnection';

const config = new Config(path.join(__dirname, '../config.json'), path.join(__dirname, '../.env'));

let historicalDataService: HistoricalDataService;

(async () => {
    await initMeshConnectionAsync(config);
    console.log('mesh connection created');
    await initDBConnectionAsync();
    console.log('db connection created');

    const meshConnection = getMeshConnection();
    const orders = await meshConnection.getOrdersAsync();
    console.log('mesh orders received');

    historicalDataService = new HistoricalDataService();
    await historicalDataService.saveTotalOrdersAsync(orders);
    await historicalDataService.saveTotalNumberOfMarketsAsync(orders);
})();
