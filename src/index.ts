import * as bodyParser from 'body-parser';
import express from 'express';
import * as path from 'path';
import 'reflect-metadata';

import { initLogger } from './common/logger';
import { Config } from './config';
import { Jobs } from './jobs/jobs';

import { initMeshConnectionAsync } from './connections/meshConnection';
import { initDBConnectionAsync } from './connections/dbConnection';

const config = new Config(path.join(__dirname, '../config.json'), path.join(__dirname, '../.env'));
initLogger(config);

(async () => {
    await initMeshConnectionAsync(config);
    await initDBConnectionAsync(config);
    Jobs.init(config);
})();
