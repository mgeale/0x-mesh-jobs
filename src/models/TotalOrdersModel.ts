export class TotalOrdersModel {
    public timestamp: number;
    public totalOrders: number;
    constructor(opts: { timestamp?: number; totalOrders?: number } = {}) {
        this.timestamp = opts.timestamp;
        this.totalOrders = opts.totalOrders;
    }
}
