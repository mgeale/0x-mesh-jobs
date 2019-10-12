import { MongoClient } from 'mongodb';
import { Config } from './config';

export class DbConnection {
    private mongoConnection: MongoClient;

    constructor(config: Config) {
        this.mongoConnection = new MongoClient(config.mongodb.connectionString, { useUnifiedTopology: true });
        return this.mongoConnection;
    }

    public async dispose() {
        this.mongoConnection.close();
    }

    public async connect() {
        await this.mongoConnection.connect({ useNewUrlParser: true });
    }
}
