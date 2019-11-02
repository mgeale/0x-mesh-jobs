import * as bodyParser from 'body-parser';
import express from 'express';
import * as path from 'path';
import 'reflect-metadata';

import { initLogger, logger } from './common/logger';
import { Config } from './config';
import { Jobs } from './jobs/jobs';

const config = new Config(path.join(__dirname, '../config.json'), path.join(__dirname, '../.env'));
initLogger(config);

Jobs.init(config);
