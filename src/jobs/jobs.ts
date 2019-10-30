import { Config } from '../config';

import { initOrderRecord } from './recordOrders';

export class Jobs {
    public static init(config: Config) {
        // this.recordOrders(config);
    }

    private static recordOrders(config: Config) {
        setInterval(async () => {
            await initOrderRecord(config);
        }, config.timeoutInterval);
    }
}
