import { BigNumber } from '@0x/mesh-rpc-client';

import { loadTestOrderInfo } from '../test/loadTestOrderInfo';

import { getAskOrderPrice } from './orderPrice';
import { calculateSlippage, calculateAveragePriceOfFilledOrders, calculateTotalCostOfFilledOrders } from './slippage';

import { EncodedAssets } from '../test/assetData';

// work in progress
xdescribe('slippage', () => {
    const singleDai = 1000000000000000000;
    const fourWeth = 4000000000000000000;
    const testOrders = [{price: new BigNumber(10), amount: new BigNumber(12)}, {price: new BigNumber(14), amount: new BigNumber(16)}];

    it('should calculate slippage', () => {
        const purchaseAmount = fourWeth + 1000;
        const orderInfo = loadTestOrderInfo();
        const daiWethOrders = orderInfo.filter(
            o =>
                o.signedOrder.makerAssetData === EncodedAssets.Weth &&
                o.signedOrder.takerAssetData === EncodedAssets.Dai
        );
        const orderPrices = getAskOrderPrice(daiWethOrders.map(i => i.signedOrder));
        const result = calculateSlippage(orderPrices, purchaseAmount);
        expect(result.slippage).toEqual(new BigNumber(-3.9));
    });

    it('should calculate average price of filled orders', () => {
        const result = calculateAveragePriceOfFilledOrders(testOrders);
        expect(result).toEqual(new BigNumber(13));
    });

    it('should calculate total cost of filled orders', () => {
        const result = calculateTotalCostOfFilledOrders(testOrders);
        expect(result).toEqual(new BigNumber(344));
    });
});
