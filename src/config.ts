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
    public port: number = 8080;
    public stage: Stage = Stage.DEV;
    public logLevel: string = LogLevel.DEBUG;
    public timeoutInterval: number;
    public postgresConnectionUrl: string;
    public meshConnectionUrl: string;

    constructor(private readonly _configPath: string, private readonly _envPath: string) {
        this._loadFromEnv();
        this._loadFromFile();
    }

    private _loadFromEnv(): void {
        env(this._envPath);
        this.timeoutInterval = parseInt(process.env.TIMEOUT_INTERVAL);
        this.meshConnectionUrl = process.env.MESH_CONNECTION_STRING;
        this.postgresConnectionUrl = process.env.POSTGRES_CONNECTION_STRING;
    }

    private _loadFromFile(): void {
        const configAsString = fs.readFileSync(this._configPath).toString();
        const o = JSON.parse(configAsString);
        Object.assign(this, o);
    }
}
