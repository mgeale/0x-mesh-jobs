import { OrderInfo } from '@0x/mesh-rpc-client';
import { TokenAddress } from '../common/tokenAddress';

export interface TotalMarketOrders {
    id: string;
    totalOrders: string;
}

export class MarketTotals {
	public static calculateTotalNumberOfMarkets(orders: OrderInfo[]): number {
        const results = orders.map(order => {
            const sorted = [order.signedOrder.makerAssetData, order.signedOrder.takerAssetData].sort();
            return sorted.join("|");
        });
        const uniqueMarkets = [...new Set(results)];
        return uniqueMarkets.length;
    }

    public static calculateTotalOrdersPerMarket(orders: OrderInfo[]): TotalMarketOrders[] {
        const results = orders.map(order => {
            const makerAssetAddress = TokenAddress.toTokenAddress(order.signedOrder.makerAssetData);
            const takerAssetAddress = TokenAddress.toTokenAddress(order.signedOrder.takerAssetData);
            const sorted = [makerAssetAddress, takerAssetAddress].sort();
            return {
                id: sorted.join("|"),
                makerPosition: sorted[0] === makerAssetAddress ? 0 : 1
            }
        });

        const uniqueMarketIds = [...new Set(results.map(r => r.id))]
        return uniqueMarketIds.map(id => {
            let count = [0, 0];
            results.forEach(r => {
                if (r.id === id) {
                    if (r.makerPosition === 0) {
                        count[0]++;
                    } else if (r.makerPosition === 1) {
                        count[1]++;
                    }
                }
            });
            return {
                id: id,
                totalOrders: count.join("|")
            }
        });
    }
}