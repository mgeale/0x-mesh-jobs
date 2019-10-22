import { BigNumber, SignedOrder } from '@0x/mesh-rpc-client';

export interface OrderPrice extends SignedOrder {
    makerToken: string;
    takerToken: string;
    price: BigNumber;
    makerAmount: BigNumber;
    takerAmount: BigNumber;
}
