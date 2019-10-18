import { BigNumber, OrderInfo } from '@0x/mesh-rpc-client';

import { OrderPrice } from '../models/OrderModels';
import { CurrentStateService } from '../services/currentStateService';
import { loadTestOrderInfo } from '../test/loadTestOrderInfo';

import { getSlippage } from './slippage';

describe('slippage', () => {
    let service: CurrentStateService;
    let orders: OrderInfo[];

    beforeAll(() => {
        service = new CurrentStateService();
        orders = loadTestOrderInfo();
    });

    it('should calculate slippage', () => {
        const orders: OrderPrice[] = [
            {
                makerToken: 'maker_token',
                takerToken: 'taker_token',
                price: new BigNumber(10),
                makerAmount: new BigNumber(10),
                takerAmount: new BigNumber(10),
                signature: 'signature',
                senderAddress: 'sender_address',
                makerAddress: 'maker_address',
                takerAddress: 'taker_address',
                makerFee: new BigNumber(10),
                takerFee: new BigNumber(10),
                makerAssetAmount: new BigNumber(10),
                takerAssetAmount: new BigNumber(10),
                makerAssetData: 'maker_asset_data',
                takerAssetData: 'taker_asset_data',
                salt: new BigNumber(10),
                exchangeAddress: 'exchange_address',
                feeRecipientAddress: 'fee_recipient_address',
                expirationTimeSeconds: new BigNumber(10),
            },
        ];
        expect(getSlippage(orders, 10)).toEqual({price: new BigNumber(100), count: new BigNumber(10)});
    });
});
