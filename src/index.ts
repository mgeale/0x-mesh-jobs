import * as path from 'path';
import 'reflect-metadata';

import { Config } from './config';
import { getDBConnection, initDBConnectionAsync } from './connections/dbConnection';
import { getMeshConnection, initMeshConnectionAsync } from './connections/meshConnection';
import { HistoricalDataService } from './services/historicalDataService';

const config = new Config(path.join(__dirname, '../config.json'), path.join(__dirname, '../.env'));

let historicalDataService: HistoricalDataService;

(async () => {
    await initMeshConnectionAsync(config);
    console.log('mesh connection created');
    await initDBConnectionAsync(config);
    console.log('db connection created');
    setInterval(async () => {
        const meshConnection = getMeshConnection();
        const orders = await meshConnection.getOrdersAsync();
        console.log('mesh orders received');

        historicalDataService = new HistoricalDataService();
        await historicalDataService.saveTotalOrdersAsync(orders);
        await historicalDataService.saveTotalNumberOfMarketsAsync(orders);
        await historicalDataService.saveTotalOrdersPerMarketAsync(orders);
        await historicalDataService.saveOrdersPerMarket(orders);

        //meshConnection.destroy();
        //console.log('mesh connection destroyed');
        //const dbConnection = getDBConnection();
        //dbConnection.close();
        //console.log('db connection closed');
    }, config.timeoutInterval);
})();
