import * as fs from 'fs';
import * as path from 'path';
import { Logger, LoggerInstance, LoggerOptions, transports } from 'winston';

import { Config, LogLevel, Stage } from '../config';

/**
 * Logger for printing info, errors, etc
 */
export function initLogger(config: Config) {
    if (logger) return;

    const logDir = path.join(__dirname, '../../logs')
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }

    const dateFormatOptions = {
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

    const tsFormat = () => new Date().toLocaleString('us', dateFormatOptions);

    const logOptions: LoggerOptions = {
        transports: [
            new transports.Console({
                timestamp: tsFormat,
                colorize: config.stage !== Stage.Prod,
                handleExceptions: true,
                stderrLevels: [LogLevel.Error],
                level: config.logLevel
            }),
            new transports.File({
                filename: `${logDir}/-log.log`,
                timestamp: tsFormat,
                datePattern: 'yyyy-MM-dd',
                prepend: true,
                handleExceptions: true,
                stderrLevels: [LogLevel.Error],
                zippedArchive: config.stage === 'prod',
                level: config.logLevel
            })
        ]
    };
    logger = new Logger(logOptions);
}

export let logger: LoggerInstance;
