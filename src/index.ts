import * as path from 'path';
import 'reflect-metadata';

import { initLogger } from './common/logger';
import { Config } from './config';
import { initDBConnectionAsync } from './connections/dbConnection';
import { initMeshConnectionAsync } from './connections/meshConnection';
import { Jobs } from './jobs/jobs';

const config = new Config(path.join(__dirname, '../config.json'), path.join(__dirname, '../.env'));
initLogger(config);

(async () => {
    await initMeshConnectionAsync(config);
    await initDBConnectionAsync(config);
    await Jobs.init(config);
})();
