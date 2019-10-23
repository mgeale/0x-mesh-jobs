import { BigNumber, OrderInfo } from '@0x/mesh-rpc-client';

import { OrderPrice } from '../models/OrderModels';
import { CurrentStateService } from '../services/currentStateService';
import { loadTestOrderInfo } from '../test/loadTestOrderInfo';

import { toOrderPrice } from './orderPrice';
import { calculateSlippage } from './slippage';
import { TokenData } from './tokenData';

fdescribe('slippage', () => {
    let service: CurrentStateService;

    beforeAll(() => {
        service = new CurrentStateService();
    });

    it('should calculate slippage', () => {
        const orderInfo = loadTestOrderInfo();
        const orderPrices = toOrderPrice(orderInfo.map(i => i.signedOrder));
        const result = calculateSlippage(orderPrices, 0.3);
        console.log(result);
        //expect(result).toEqual({ price: new BigNumber(100), count: new BigNumber(10) });
    });
});
