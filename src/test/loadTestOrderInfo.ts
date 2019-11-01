import { BigNumber, OrderInfo } from '@0x/mesh-rpc-client';
import * as fs from 'fs';
import * as path from 'path';

import { EncodedAssets } from './assetData';

export function loadTestOrderInfo(): OrderInfo[] {
    const orders = [];
    const length = 5;
    let index = 0;
    const makerAmount = 1000000000000000000;
    // erc20
    while (index < length) {
        const takerAmount = (index + 1) * 1000000000000000000 + 179000000000000000000;
        orders.push({
            signedOrder: {
                senderAddress: 'sender_address',
                makerAddress: 'maker_address',
                takerAddress: 'taker_address',
                makerFee: new BigNumber(0),
                takerFee: new BigNumber(0),
                makerAssetAmount: new BigNumber(makerAmount),
                takerAssetAmount: new BigNumber(takerAmount),
                makerAssetData: EncodedAssets.Dai,
                takerAssetData: EncodedAssets.Weth,
                salt: new BigNumber(0),
                exchangeAddress: 'exchange_address',
                feeRecipientAddress: 'fee_recipient_address',
                expirationTimeSeconds: new BigNumber(0),
                signature: 'signature',
            },
        });
        index++;
    }
    // erc721
    orders.push({
        orderHash: '0x50003e5b970ecf56d011be587d80a39e2f653a3c406fc0b23f11238c87a01b63',
        signedOrder: {
            makerAddress: '0x3d998257969835ea93636079e8e5b4c0e79b2242',
            makerAssetData:
                '0x02571792000000000000000000000000fac7bea255a6990f749363002136af6556b31e04d435498938c5c96c98549fad04394984a4556cb5db127e0ba75531565a275b79',
            makerAssetAmount: new BigNumber('1'),
            makerFee: new BigNumber('0'),
            takerAddress: '0x0000000000000000000000000000000000000000',
            takerAssetData: '0xf47261b0000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            takerAssetAmount: new BigNumber('125000000000000000'),
            takerFee: new BigNumber('0'),
            senderAddress: '0x0000000000000000000000000000000000000000',
            exchangeAddress: '0x080bf510fcbf18b91105470639e9561022937712',
            feeRecipientAddress: '0xb0d7398d779ee9ffc727d2d5b045a5b441da8233',
            expirationTimeSeconds: new BigNumber('1590253200'),
            salt: new BigNumber('80544986342272251015719086521618205981397433227870693366279109287530862044912'),
            signature:
                '0x1b96a0fdc0230a6b3014d33e017a6db4903ad8044e3e05d3191e02f618cdb4c09c2f311285d1377f546dc65807a8a4e62cce0a1855a09fad40604c18c24ff66dda02'
        },
        fillableTakerAssetAmount: new BigNumber('125000000000000000')
    });
    // multiAssetOrder
    orders.push({
        orderHash: '0x43b7913a1479c17c797f23965e432c2d302fb068689308559e733f9f03c7ec17',
        signedOrder: {
            makerAddress: '0xdcae967431fb51aa7453ec6c06fa544c25e0f1ff',
            makerAssetData:
                '0x94cfcdd7000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000004402571792000000000000000000000000bdaed67214641b7eda3bf8d7431c3ae5fc46f466000000000000000000000000000000000000000000000000000000000000009c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004402571792000000000000000000000000bdaed67214641b7eda3bf8d7431c3ae5fc46f466000000000000000000000000000000000000000000000000000000000000019e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004402571792000000000000000000000000bdaed67214641b7eda3bf8d7431c3ae5fc46f466000000000000000000000000000000000000000000000000000000000000022000000000000000000000000000000000000000000000000000000000',
            makerAssetAmount: new BigNumber('1'),
            makerFee: new BigNumber('0'),
            takerAddress: '0x0000000000000000000000000000000000000000',
            takerAssetData: '0xf47261b0000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            takerAssetAmount: new BigNumber('10000000000000000'),
            takerFee: new BigNumber('0'),
            senderAddress: '0x0000000000000000000000000000000000000000',
            exchangeAddress: '0x080bf510fcbf18b91105470639e9561022937712',
            feeRecipientAddress: '0xb0d7398d779ee9ffc727d2d5b045a5b441da8233',
            expirationTimeSeconds: new BigNumber('1576828800'),
            salt: new BigNumber('43093920559528974630875363482779105377433448845750093018366375035674683348719'),
            signature:
                '0x1cdf6a9479d9390ea6ccdb7f0fbe3e4ff6d0078431b8c3c06ecd523706aaa5157b5815d79e4d9df36e650f950e9622b09b971770d7916a30a747ed71c4ad8bd52e02'
        },
        fillableTakerAssetAmount: new BigNumber('10000000000000000')
    });
    return orders;
}

export function loadTestOrderInfoFile(): OrderInfo[] {
    const rawData = fs.readFileSync(path.join(__dirname, '../../testData/meshOrders.json'));
    const orders = JSON.parse(rawData.toString());
    return orders.map(o => {
        return {
            orderHash: o.orderHash,
            signedOrder: {
                ...o.signedOrder,
                makerFee: new BigNumber(o.signedOrder.makerFee),
                takerFee: new BigNumber(o.signedOrder.takerFee),
                makerAssetAmount: new BigNumber(o.signedOrder.makerAssetAmount),
                takerAssetAmount: new BigNumber(o.signedOrder.takerAssetAmount),
                salt: new BigNumber(o.signedOrder.salt),
                expirationTimeSeconds: new BigNumber(o.signedOrder.expirationTimeSeconds)
            },
            fillableTakerAssetAmount: o.fillableTakerAssetAmount
        };
    });
}
