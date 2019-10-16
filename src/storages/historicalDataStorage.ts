import { getDBConnection } from '../dbConnection';
import { TotalOrderModel } from '../models/totalOrderModel';

export class HistoricalDataStorage {
    constructor() {}

    public async saveTotalOrders(total: number) {
        const connection = getDBConnection();
        console.log(`Saving ${total} total orders to db`);
        const entry = new TotalOrderModel({
            timestamp: new Date().getTime(),
            total
        });
        await connection.manager.save(entry);
    }

    public async getTotalOrders() {}
}
