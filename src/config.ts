import * as fs from 'fs';
import env from 'env2';

export class Config {
    public meshConnectionString: string;

    constructor(private readonly _configPath: string, private readonly _envPath: string) {
        this._loadFromFile();
        this._loadFromEnv();
    }

    private _loadFromEnv(): void {
        env(this._envPath);
        this.meshConnectionString = process.env.MESH_CONNECTION_STRING;
    }

    private _loadFromFile(): void {
        const configAsString = fs.readFileSync(this._configPath).toString();
        const o = JSON.parse(configAsString);
        Object.assign(this, o);
    }
}
