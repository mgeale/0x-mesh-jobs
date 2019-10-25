export class TotalMarketsModel {
    public timestamp: number;
    public totalMarkets: number;
    constructor(opts: { timestamp?: number; totalMarkets?: number } = {}) {
        this.timestamp = opts.timestamp;
        this.totalMarkets = opts.totalMarkets;
    }
}
