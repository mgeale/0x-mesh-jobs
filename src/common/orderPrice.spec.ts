import { loadTestOrderInfo } from '../test/loadTestOrderInfo';

import { getOrdersPerMarket, MarketOrders } from './marketTotals';

xdescribe('order price', () => {
    let marketOrders: MarketOrders[];

    beforeAll(() => {
        const orders = loadTestOrderInfo();
        marketOrders = getOrdersPerMarket(orders);
    });
});
