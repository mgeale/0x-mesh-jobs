export class TotalOrderPerMarketModel {
	public timestamp: number;
	public marketId: string;
    public totalOrders: number;
    constructor(opts: { timestamp?: number; marketId?: string; totalOrders?: number } = {}) {
        this.timestamp = opts.timestamp;
        this.marketId = opts.marketId;
        this.totalOrders = opts.totalOrders;
    }
}