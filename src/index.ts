import * as bodyParser from 'body-parser';
import express from 'express';
import * as path from 'path';
import 'reflect-metadata';

import { initLogger, logger } from './common/logger';
import { Config } from './config';
import { Jobs } from './jobs/jobs';
import { AppRoutes } from './routes';

const config = new Config(path.join(__dirname, '../config.json'), path.join(__dirname, '../.env'));
initLogger(config);

const port = config.port;
const app = express();

app.use(bodyParser.json());

app.use((req: express.Request, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

AppRoutes.forEach(route => {
    app[route.method](route.path, (request: Request, response: Response, next: (error) => void) => {
        route
            .action(request, response)
            .then(() => next)
            .catch(err => next(err));
    });
});

app.listen(port, () => logger.info(`Server is up and running on port ${port}`));

Jobs.init(config);
