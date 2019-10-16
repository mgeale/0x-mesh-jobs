import * as fs from 'fs';

export class Config {
    public mesh: {
        connectionString: string;
    };
    constructor(private readonly _configPath: string) {
        this._loadFromFile();
    }

    private _loadFromFile(): void {
        const configAsString = fs.readFileSync(this._configPath).toString();
        const o = JSON.parse(configAsString);
        Object.assign(this, o);
    }
}
