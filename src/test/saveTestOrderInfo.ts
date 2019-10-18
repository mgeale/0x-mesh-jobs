import * as fs from 'fs';
import * as path from 'path';

import { Config } from '../config';
import { getMeshConnection, initMeshConnectionAsync } from '../meshConnection';

const config = new Config(path.join(__dirname, '../../config.json'));

(async () => {
    await initMeshConnectionAsync(config);
    const meshConnection = getMeshConnection();
    const orders = await meshConnection.getOrdersAsync();
    fs.writeFileSync(path.join(__dirname, '../../testData/meshOrders.json'), JSON.stringify(orders, null, 2));
    process.exit();
})();
