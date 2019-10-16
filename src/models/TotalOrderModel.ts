export class TotalOrderModel {
    public total: number;
    public timestamp: number;
    constructor(opts: { total: number; timestamp: number }) {
        this.total = opts.total;
        this.timestamp = opts.timestamp;
    }
}
