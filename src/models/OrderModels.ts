import { SignedOrder } from '@0x/mesh-rpc-client';
import { BigNumber } from 'bignumber.js';

export interface OrderPrice extends SignedOrder {
    makerToken: string;
    takerToken: string;
    price: BigNumber;
    makerAmount: BigNumber;
    takerAmount: BigNumber;
}
