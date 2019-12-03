import { Config } from '../config';

import { meshSnapshot } from './meshSnapshot';

export class Jobs {
    public static async init(config: Config): Promise<void> {
        this.recordOrders(config);
    }

    private static recordOrders(config: Config): void {
        setInterval(async () => {
            await meshSnapshot(config);
        }, config.timeoutInterval);
    }
}
