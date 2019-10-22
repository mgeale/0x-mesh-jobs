import { BigNumber, OrderInfo } from '@0x/mesh-rpc-client';

import { OrderPrice } from '../models/OrderModels';
import { CurrentStateService } from '../services/currentStateService';
import { loadTestOrderInfo } from '../test/loadTestOrderInfo';

import { toOrderPrice } from './orderPrice';
import { calculateSlippage } from './slippage';

fdescribe('slippage', () => {
    let service: CurrentStateService;
    let orders: OrderInfo[];
    let orderPrices: OrderPrice[];

    beforeAll(() => {
        service = new CurrentStateService();
        orders = loadTestOrderInfo();
        orderPrices = toOrderPrice(orders);
        console.log(orderPrices)
    });

    it('should calculate slippage', () => {
        console.log(orderPrices)
        expect(calculateSlippage(orderPrices, 10)).toEqual({ price: new BigNumber(100), count: new BigNumber(10) });
    });
});
