export class OrdersPerMarketModel {
	public timestamp: number;
	public marketId: string;
    public orders: any[];
    constructor(opts: { timestamp?: number; marketId?: string; orders?: any[] } = {}) {
        this.timestamp = opts.timestamp;
        this.marketId = opts.marketId;
        this.orders = opts.orders;
    }
}