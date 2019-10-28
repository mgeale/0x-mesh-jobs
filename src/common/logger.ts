import * as cls from 'cls-hooked';
import * as winston from 'winston';

import { Config, LogLevel, Stage } from '../config';

/**
 * <<<<<<<>>>>>>>>>.
 */
export function initLogger(config: Config) {
    if (!logger) {
        logger = Logger.create(config);
    }
}

export let logger: winston.LoggerInstance;

class Logger extends winston.Logger {

    private static _dateFormatOptions = {
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    public static create(config: Config) {
        const options = {
            timestamp: () => new Date().toLocaleString('us', Logger._dateFormatOptions),
            colorize: config.stage !== Stage.PROD,
            handleExceptions: true,
            stderrLevels: [LogLevel.ERROR],
            level: config.logLevel,
        };
        return new Logger(options);
    }

    public log(...args) {
        const label = this._getRequestId();
        if (label) {
            const newLogger = this._getOrCreateLogger(label).log(...args);
            if (newLogger) {
                newLogger.close();
            }
            return newLogger;
        }
        return super.log(...args);
    }

    private constructor(private _options) {
        super({
            transports: [new winston.transports.Console(_options)],
        });
    }

    private _getRequestId() {
        const namespace = cls.getNamespace('request');
        return namespace ? namespace.get('requestId') : null;
    }

    private _getOrCreateLogger(label: string) {
        return winston.loggers.get(label, {
            transports: [
                new winston.transports.Console({
                    ...this._options,
                    label,
                }),
            ],
        });
    }
}
