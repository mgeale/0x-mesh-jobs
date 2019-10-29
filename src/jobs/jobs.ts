import { Config } from '../config';
import { initOrderRecord } from './recordOrders';

export class Jobs {
    public static init(config: Config) {
        //this.recordOrders(config);
    }

    private static recordOrders(config: Config) {
        setInterval(() => {
            initOrderRecord(config);
        }, config.timeoutInterval);
    }
}
