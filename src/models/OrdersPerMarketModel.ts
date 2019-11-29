import { OrderAmounts } from '../common/orders';

export class OrdersPerMarketModel {
    public timestamp: number;
    public marketId: string;
    public orders: OrderAmounts[];
    constructor(opts: { timestamp?: number; marketId?: string; orders?: OrderAmounts[] } = {}) {
        this.timestamp = opts.timestamp;
        this.marketId = opts.marketId;
        this.orders = opts.orders;
    }
}
