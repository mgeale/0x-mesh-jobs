import { BigNumber, SignedOrder } from '@0x/mesh-rpc-client';

export interface OrderPrice extends SignedOrder {
    price: BigNumber;
    makerAmount: BigNumber;
    takerAmount: BigNumber;
}
