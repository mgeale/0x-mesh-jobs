import { Config } from '../config';

import { meshSnapshot } from './meshSnapshot';

export class Jobs {
    public static async init(config: Config) {
        this.recordOrders(config);
    }

    private static recordOrders(config: Config) {
        setInterval(async () => {
            await meshSnapshot(config);
        }, config.timeoutInterval);
    }
}
