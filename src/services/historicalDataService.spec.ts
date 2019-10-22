import { BigNumber, OrderInfo } from '@0x/mesh-rpc-client';

import { loadTestOrderInfo } from '../test/loadTestOrderInfo';
import { HistoricalDataService } from './historicalDataService';

xdescribe('historical data service', () => {
	let service: HistoricalDataService;
    let orders: OrderInfo[];

	beforeAll(() => {
		service = new HistoricalDataService();
		orders = loadTestOrderInfo();
	});

	it('should save total number of markets', async () => {
		const markets = await service.saveTotalNumberOfMarketsAsync(orders);
		
	});

});