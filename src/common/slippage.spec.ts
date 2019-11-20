import { BigNumber } from '@0x/mesh-rpc-client';

import { loadTestOrderInfo } from '../test/loadTestOrderInfo';

import { toOrderPrice } from './orderPrice';
import { calculateSlippage } from './slippage';

import { EncodedAssets } from '../test/assetData';

xdescribe('slippage', () => {
    it('should calculate slippage', () => {
        const purchaseAmount = 1;
        const orderInfo = loadTestOrderInfo();
        const daiWethOrders = orderInfo.filter(
            o =>
                o.signedOrder.makerAssetData === EncodedAssets.Weth &&
                o.signedOrder.takerAssetData === EncodedAssets.Dai
        );
        const orderPrices = toOrderPrice(daiWethOrders.map(i => i.signedOrder));
        const result = calculateSlippage(orderPrices, purchaseAmount);
        console.log(result);
        expect(result.count).toEqual(purchaseAmount);
        // expect(result).toEqual({ price: new BigNumber(), count: new BigNumber(purchaseAmount) });
    });
});
