import {HistoricalDataStorage} from '../storages/historicalDataStorage';
export class HistoricalDataService {
    private storage: HistoricalDataStorage;

    constructor(private dbConnection, private meshConnection) {
        this.storage = new HistoricalDataStorage(dbConnection)
    }

    saveTotalOrdersOnTheHour() {
        setInterval(async () => {
            const orders = await this.meshConnection.getOrdersAsync();
            console.log("ORDERS", orders);

        }, 10000)
    }
}
