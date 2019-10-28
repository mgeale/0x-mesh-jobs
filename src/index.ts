import * as bodyParser from 'body-parser';
import {Request, Response} from 'express';
import * as express from 'express';
import * as path from 'path';
import 'reflect-metadata';

import { initLogger, logger } from './common/logger';
import { Config } from './config';
import { getDBConnection, initDBConnectionAsync } from './connections/dbConnection';
import { getMeshConnection, initMeshConnectionAsync } from './connections/meshConnection';
import {AppRoutes} from './routes';
import { HistoricalDataService } from './services/historicalDataService';

const config = new Config(path.join(__dirname, '../config.json'), path.join(__dirname, '../.env'));

initLogger(config);
const port = config.port;

let historicalDataService: HistoricalDataService;

(async () => {
    await initMeshConnectionAsync(config);
    logger.log('mesh connection created');
    await initDBConnectionAsync(config);
    logger.log('db connection created');

    setInterval(async () => {
        const meshConnection = getMeshConnection();
        const orders = await meshConnection.getOrdersAsync();
        logger.log('mesh orders received');

        historicalDataService = new HistoricalDataService();
        await historicalDataService.saveTotalOrdersAsync(orders);
        await historicalDataService.saveTotalNumberOfMarketsAsync(orders);
        await historicalDataService.saveTotalOrdersPerMarketAsync(orders);
        await historicalDataService.saveOrdersPerMarket(orders);

        meshConnection.destroy();
        logger.log('mesh connection destroyed');
        const dbConnection = getDBConnection();
        dbConnection.close();
        logger.log('db connection closed');
    }, config.timeoutInterval);

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register all application routes
    AppRoutes.forEach(route => {
        app[route.method](route.path, (request: Request, response: Response, next: (error) => void) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });

    // run app
    app.listen(port, () => logger.log(`Express application is up and running on port ${port}`));
})();
