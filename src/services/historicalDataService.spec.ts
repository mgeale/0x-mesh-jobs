import { OrderInfo } from '@0x/mesh-rpc-client';

import { loadTestOrderInfo } from '../test/loadTestOrderInfo';

import { HistoricalDataService } from './historicalDataService';

describe('historical data service', () => {
    let service: HistoricalDataService;
    let orders: OrderInfo[];

    beforeAll(() => {
        service = new HistoricalDataService();
        orders = loadTestOrderInfo();
    });
});
