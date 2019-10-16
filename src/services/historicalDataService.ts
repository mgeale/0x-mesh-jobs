import { OrderInfo } from '@0x/mesh-rpc-client';

import { HistoricalDataStorage } from '../storages/historicalDataStorage';

export class HistoricalDataService {
    private readonly storage: HistoricalDataStorage;

    constructor() {
        this.storage = new HistoricalDataStorage();
    }

    public async saveTotalOrders(orders: OrderInfo[]): Promise<void> {
        await this.storage.saveTotalOrders(orders.length);
    }

    public async saveTotalOrdersPerMarket(orders: OrderInfo[]): Promise<void> {
        // TODO: finish
        const result = orders.map(order => {
            return {
                makerAssetData: order.signedOrder.makerAssetData,
                takerAssetData: order.signedOrder.takerAssetData
            };
        });
    }
}
