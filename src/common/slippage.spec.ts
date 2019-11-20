import { BigNumber } from '@0x/mesh-rpc-client';

import { loadTestOrderInfo } from '../test/loadTestOrderInfo';

import { toOrderPrice } from './orderPrice';
import { calculateSlippage } from './slippage';

import { EncodedAssets } from '../test/assetData';

// work in progress
describe('slippage', () => {
    const singleDai = 1000000000000000000;
    const fourWeth = 4000000000000000000;

    it('should calculate slippage', () => {
        const purchaseAmount = fourWeth;
        const orderInfo = loadTestOrderInfo();
        const daiWethOrders = orderInfo.filter(
            o =>
                o.signedOrder.makerAssetData === EncodedAssets.Weth &&
                o.signedOrder.takerAssetData === EncodedAssets.Dai
        );
        const orderPrices = toOrderPrice(daiWethOrders.map(i => i.signedOrder));
        const result = calculateSlippage(orderPrices, purchaseAmount);
        expect(result.slippage).toEqual(new BigNumber(-3.75));
    });
});
