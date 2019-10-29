import env from 'env2';
import * as fs from 'fs';

export enum Stage {
    TEST = 'test',
    DEV = 'dev',
    STAGE = 'staging',
    PROD = 'prod'
}

export enum LogLevel {
    DEBUG = 'debug',
    VERBOSE = 'verbose',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error'
}

export class Config {
    public port: number;
    public stage: Stage;
    public logLevel: string;
    public timeoutInterval: number;
    public postgresConnectionUrl: string;
    public meshConnectionUrl: string;

    constructor(private readonly _configPath: string, private readonly _envPath: string) {
        this._loadFromEnv();
        this._loadFromFile();
    }

    private _loadFromEnv(): void {
        env(this._envPath);

        if (process.env.PORT) {
            this.port = parseInt(process.env.PORT, 10);
        }
        this.stage = (process.env.STAGE as Stage) || this.stage;
        this.logLevel = process.env.LOG_LEVEL || this.logLevel;
        this.timeoutInterval = parseInt(process.env.TIMEOUT_INTERVAL, 10);
        this.meshConnectionUrl = process.env.MESH_CONNECTION_STRING;
        this.postgresConnectionUrl = process.env.POSTGRES_CONNECTION_STRING;
    }

    private _loadFromFile(): void {
        const configAsString = fs.readFileSync(this._configPath).toString();
        const o = JSON.parse(configAsString);
        Object.assign(this, o);
    }
}
