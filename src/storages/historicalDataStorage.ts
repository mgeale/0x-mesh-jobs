import { MongoClient } from 'mongodb';

export class HistoricalDataStorage {
    private dataBaseName = 'HistoricalData';
    private collectionName = 'totalOrders'
    private db: any;
    private collection: any;

    constructor(private client: MongoClient) {
        // this.db = client.db(this.dataBaseName);
        // this.collection = this.db.collection(this.collectionName);
    }

    public async saveTotalOrders(totalOrders: number) {
        await this.collection.insertOne({ total: totalOrders , timestamp: new Date().getTime()});
    }

    public async getTotalOrders() {
        return this.collection.find().toArray();
    }
}
