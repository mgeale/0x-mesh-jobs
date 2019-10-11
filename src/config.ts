import * as fs from 'fs';

export class Config {
    public mesh: {
        connectionString: string;
    };
    public mongodb: {
        connectionString: string;
    };
    constructor(private configPath: string) {
        this.loadFromFile();
    }

    private loadFromFile() {
        const configAsString = fs.readFileSync(this.configPath).toString();
        const o = JSON.parse(configAsString);
        Object.assign(this, o);
    }
}
