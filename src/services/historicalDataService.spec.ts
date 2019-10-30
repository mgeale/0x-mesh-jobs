import { OrderInfo } from '@0x/mesh-rpc-client';

import { TimeUnitType } from '../common/timeline';
import { HistoricalDataStorage } from '../storages/historicalDataStorage';
import { loadTestOrderInfo } from '../test/loadTestOrderInfo';

import { HistoricalDataService } from './historicalDataService';

describe('historical data service', () => {
    let service: HistoricalDataService;
    let orders: OrderInfo[];
    let storageSpy: jasmine.Spy;

    beforeAll(() => {
        service = new HistoricalDataService();
        orders = loadTestOrderInfo();

        storageSpy = spyOn(HistoricalDataStorage.prototype, 'getTotalOrdersAsync').and.callFake(() => {
            return Promise.resolve([
                {
                    timestamp: 1572149967000,
                    totalOrders: 101
                },
                {
                    timestamp: 1572236367000,
                    totalOrders: 105
                },
                {
                    timestamp: 1572322767000,
                    totalOrders: 98
                },
                {
                    timestamp: 1572409167000,
                    totalOrders: 100
                }
            ]);
        });
    });

    it('should get total number of markets', async () => {
        const markets = await service.getTotalOrdersAsync(TimeUnitType.Day, 4);
        //expect(markets).toEqual([101, 105, 98, 100]);
    });
});
