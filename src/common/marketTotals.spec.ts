import { OrderInfo } from '@0x/mesh-rpc-client';
import { loadTestOrderInfo } from '../test/loadTestOrderInfo';
import { MarketTotals } from './marketTotals';

describe('market totals', () => {
    let orders: OrderInfo[];

	beforeAll(() => {
		orders = loadTestOrderInfo();
	});

	it('should calculate total number of different markets', () => {
		expect(MarketTotals.calculateTotalNumberOfMarkets(orders)).toEqual(100)
	});

	it('should calculate total number of orders per market', () => {
		expect(MarketTotals.calculateTotalOrdersPerMarket(orders)).toEqual([]);
	});

});