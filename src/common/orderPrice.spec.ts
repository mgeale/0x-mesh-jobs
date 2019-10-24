
import { loadTestOrderInfo } from '../test/loadTestOrderInfo';

import { getOrdersPerMarket, MarketOrders } from './marketTotals';
import { calculateOrderPriceForTaker } from './orderPrice';

fdescribe('order price', () => {
    let marketOrders: MarketOrders[];
    const dai = '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359';
    const weth = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
    const daiWethMarketId = [dai, weth].sort().join('|');

    beforeAll(() => {
        const orders = loadTestOrderInfo();
        marketOrders = getOrdersPerMarket(orders);
    });

    it('', () => {
        const daiMarketOrders = marketOrders.find(o => o.id === daiWethMarketId);
        const result = calculateOrderPriceForTaker(dai, 1, daiMarketOrders);
    });

});
