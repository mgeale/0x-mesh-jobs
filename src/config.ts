import env from 'env2';
import * as fs from 'fs';
import { ConnectionOptions } from 'typeorm';

export class Config {
    public orm: ConnectionOptions;
    public meshConnectionString: string;

    constructor(private readonly _configPath: string, private readonly _envPath: string) {
        this._loadFromEnv();
        this._loadFromFile();
    }

    private _loadFromEnv(): void {
        env(this._envPath);
        this.meshConnectionString = process.env.MESH_CONNECTION_STRING;
        // this.orm = {}
    }

    private _loadFromFile(): void {
        const configAsString = fs.readFileSync(this._configPath).toString();
        const o = JSON.parse(configAsString);
        Object.assign(this, o);
    }
}
