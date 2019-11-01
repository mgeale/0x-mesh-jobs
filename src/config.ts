import env from 'env2';
import * as fs from 'fs';

export enum Stage {
    Test = 'test',
    Dev = 'dev',
    Stage = 'staging',
    Prod = 'prod'
}

export enum LogLevel {
    Debug = 'debug',
    Verbose = 'verbose',
    Info = 'info',
    Warn = 'warn',
    Error = 'error'
}

export class Config {
    public port: number = 8080;
    public stage: Stage = Stage.Dev;
    public logLevel: string = LogLevel.Verbose;
    public timeoutInterval: number = 15000;
    public postgresConnectionUrl: string = '';
    public meshConnectionUrl: string = '';
    private _radix: number = 10;

    constructor(private readonly _configPath: string, private readonly _envPath: string) {
        this._loadFromEnv();
        this._loadFromFile();
    }

    private _loadFromEnv(): void {
        env(this._envPath);

        if (process.env.PORT) {
            this.port = parseInt(process.env.PORT, this._radix);
        }
        this.stage = (process.env.STAGE as Stage) || this.stage;
        this.logLevel = process.env.LOG_LEVEL || this.logLevel;
        this.timeoutInterval = parseInt(process.env.TIMEOUT_INTERVAL, this._radix);
        this.meshConnectionUrl = process.env.MESH_CONNECTION_STRING;
        this.postgresConnectionUrl = process.env.POSTGRES_CONNECTION_STRING;
    }

    private _loadFromFile(): void {
        const configAsString = fs.readFileSync(this._configPath).toString();
        const o = JSON.parse(configAsString);
        Object.assign(this, o);
    }
}
