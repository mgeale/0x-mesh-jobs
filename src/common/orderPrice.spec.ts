import { AssetAddress } from '../test/assetData';
import { loadTestOrderInfo } from '../test/loadTestOrderInfo';

import { getOrdersPerMarket, MarketOrders } from './marketTotals';
import { calculateOrderPriceForTaker } from './orderPrice';

fdescribe('order price', () => {
    let marketOrders: MarketOrders[];
    const dai = AssetAddress.Dai;
    const weth = AssetAddress.Weth;
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
