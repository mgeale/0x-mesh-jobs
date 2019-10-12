import { OrderInfo } from '@0x/mesh-rpc-client';
import * as path from 'path';

import { Config } from './config';
import { DbConnection } from './dbConnection';
import { MeshConnection } from './meshConnection';
import { HistoricalDataService } from './services/historicalDataService';

const config = new Config(path.join(__dirname, '../config.json'));

(async () => {
    const meshConnection = await new MeshConnection(config).init();
    console.log('mesh connection opened');

    const dbConnection = new DbConnection(config);
    await dbConnection.connect();
    console.log('db connection opened');

    const orders: OrderInfo[] = await meshConnection.getOrdersAsync();
    const historicalDataService = new HistoricalDataService(dbConnection);
    historicalDataService.saveTotalOrders(orders);

    //dbConnection.dispose();
    //console.log('db connection closed');
})();
