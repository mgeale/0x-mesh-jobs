
import { CurrentStateService } from '../services/currentStateService';
import { loadTestOrderInfo } from '../test/loadTestOrderInfo';

import { toOrderPrice } from './orderPrice';
import { calculateSlippage } from './slippage';

xdescribe('slippage', () => {
    let service: CurrentStateService;

    beforeAll(() => {
        service = new CurrentStateService();
    });

    it('should calculate slippage', () => {
        const orderInfo = loadTestOrderInfo();
        const orderPrices = toOrderPrice(orderInfo.map(i => i.signedOrder));
        console.log(orderPrices);
        const result = calculateSlippage(orderPrices, 10);
        console.log(result);
        // expect(result).toEqual({ price: new BigNumber(100), count: new BigNumber(10) });
    });
});
