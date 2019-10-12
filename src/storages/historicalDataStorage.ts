import { MongoClient } from 'mongodb';

export class HistoricalDataStorage {
    private readonly dataBaseName = 'HistoricalData';
    private readonly collectionName = 'totalOrders';
    private readonly db: any;
    private readonly collection: any;

    constructor(private readonly client: MongoClient) {
        this.db = client.db(this.dataBaseName);
        this.collection = this.db.collection(this.collectionName);
    }

    public async saveTotalOrders(totalOrders: number) {
        console.log(`Saving ${totalOrders} total orders to db`);
        await this.collection.insertOne({ total: totalOrders, timestamp: new Date().getTime() });
    }

    public async getTotalOrders() {
        return this.collection.find().toArray();
    }
}
