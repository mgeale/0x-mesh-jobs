import { BigNumber, OrderInfo } from '@0x/mesh-rpc-client';
import * as fs from 'fs';
import * as path from 'path';

import { EncodedAsset } from './assetData';

export function loadTestOrderInfo(): OrderInfo[] {
    const orders = [];
    const length = 5;
    let index = 0;
    const singleDai = 1000000000000000000;
    const singleWeth = 1000000000000000000;
    const makerAmount = singleDai;
    // erc20
    while (index < length) {
        const takerAmount = singleDai * (180 + index * 2.5);
        orders.push({
            signedOrder: {
                senderAddress: 'sender_address',
                makerAddress: 'maker_address',
                takerAddress: 'taker_address',
                makerFee: new BigNumber(0),
                takerFee: new BigNumber(0),
                makerAssetAmount: new BigNumber(singleWeth),
                takerAssetAmount: new BigNumber(takerAmount),
                makerAssetData: EncodedAsset.Weth,
                takerAssetData: EncodedAsset.Dai,
                salt: new BigNumber(0),
                exchangeAddress: 'exchange_address',
                feeRecipientAddress: 'fee_recipient_address',
                expirationTimeSeconds: new BigNumber(0),
                signature: 'signature'
            }
        });
        index++;
    }
    // erc721
    orders.push({
        signedOrder: {
            makerAddress: 'maker_address',
            makerAssetData: EncodedAsset.Ens,
            makerAssetAmount: new BigNumber(1),
            makerFee: new BigNumber(0),
            takerAddress: 'taker_address',
            takerAssetData: EncodedAsset.Weth,
            takerAssetAmount: new BigNumber(singleWeth / 4),
            takerFee: new BigNumber(0),
            senderAddress: 'sender_address',
            exchangeAddress: 'exchange_address',
            feeRecipientAddress: 'fee_recipient_address',
            expirationTimeSeconds: new BigNumber(0),
            salt: new BigNumber(0),
            signature: 'signature'
        }
    });
    orders.push({
        signedOrder: {
            makerAddress: 'maker_address',
            makerAssetData: EncodedAsset.Atom,
            makerAssetAmount: new BigNumber(1),
            makerFee: new BigNumber(0),
            takerAddress: 'taker_address',
            takerAssetData: EncodedAsset.Weth,
            takerAssetAmount: new BigNumber(singleWeth / 5),
            takerFee: new BigNumber(0),
            senderAddress: 'sender_address',
            exchangeAddress: 'exchange_address',
            feeRecipientAddress: 'fee_recipient_address',
            expirationTimeSeconds: new BigNumber(0),
            salt: new BigNumber(0),
            signature: 'signature'
        }
    });
    // multiAssetOrder
    orders.push({
        signedOrder: {
            makerAddress: 'maker_address',
            makerAssetData: EncodedAsset.AtomMulti,
            makerAssetAmount: new BigNumber(1),
            makerFee: new BigNumber(0),
            takerAddress: 'taker_address',
            takerAssetData: EncodedAsset.Weth,
            takerAssetAmount: new BigNumber(singleWeth),
            takerFee: new BigNumber(0),
            senderAddress: 'sender_address',
            exchangeAddress: 'exchange_address',
            feeRecipientAddress: 'fee_recipient_address',
            expirationTimeSeconds: new BigNumber(0),
            salt: new BigNumber(0),
            signature: 'signature'
        }
    });
    orders.push({
        signedOrder: {
            makerAddress: 'maker_address',
            makerAssetData: EncodedAsset.MixMulti,
            makerAssetAmount: new BigNumber(1),
            makerFee: new BigNumber(0),
            takerAddress: 'taker_address',
            takerAssetData: EncodedAsset.Weth,
            takerAssetAmount: new BigNumber(singleWeth),
            takerFee: new BigNumber(0),
            senderAddress: 'sender_address',
            exchangeAddress: 'exchange_address',
            feeRecipientAddress: 'fee_recipient_address',
            expirationTimeSeconds: new BigNumber(0),
            salt: new BigNumber(0),
            signature: 'signature'
        }
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
