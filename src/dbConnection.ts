import { MongoClient } from 'mongodb';
import { Config } from './config';

export class DbConnection {
    public mongoConnection;

    constructor(config: Config) {
        this.mongoConnection = new MongoClient(config.mongodb.connectionString, { useUnifiedTopology: true });
        this.mongoConnection.connect({ useNewUrlParser: true });
    }

    public async dispose() {
        this.mongoConnection.close();
    }
}
