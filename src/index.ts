import * as path from 'path';

import { Config } from './config';
import { getMeshConnection, initMeshConnection } from './meshConnection';
import { CurrentStateService } from './services/currentStateService';

const config = new Config(path.join(__dirname, '../config.json'));

enum encodedAssets {
    WETH = '0xf47261b000000000000000000000000089d24a6b4ccb1b6faa2625fe562bdd9a23260359',
    DAI = '0xf47261b0000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
}

(async () => {
    await initMeshConnection(config);
    const market = {
        makerAsset: encodedAssets.WETH,
        takerAsset: encodedAssets.DAI
    };
    const orders = await new CurrentStateService().getOrderBookAsync(market);
    const slippage = new CurrentStateService().getSlippage(orders, 10);
    console.log(slippage);
})();
