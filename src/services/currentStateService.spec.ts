import { CurrentStateService } from './currentStateService';
import { OrderPrice } from '../models/OrderModels';
import { BigNumber } from 'bignumber.js';

describe('current state service', () => {
    let service: CurrentStateService;

    beforeAll(() => {
        service = new CurrentStateService();
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
                expirationTimeSeconds: new BigNumber(10)
            }
        ];
        expect(service.getSlippage(orders, 10)).toEqual({price: new BigNumber(100), count: new BigNumber(10)});
    });
});
