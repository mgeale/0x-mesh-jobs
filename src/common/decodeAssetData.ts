import { BigNumber } from '@0x/mesh-rpc-client';
import { assetDataUtils } from '@0x/order-utils';

export interface DecodeAssetData {
    assetProxyId: string;
    tokenAddress: string;
    amounts?: BigNumber[];
    tokenId?: BigNumber;
}

export function decodeAssetData(encodedAssetData: string): DecodeAssetData {
    const erc20RegEx = new RegExp('^0xf47261b0');
    const erc721RegEx = new RegExp('^0x02571792');
    const multiAsset = new RegExp('^0x94cfcdd7');

    if (erc20RegEx.test(encodedAssetData)) {
        return assetDataUtils.decodeERC20AssetData(encodedAssetData);
    } else if (erc721RegEx.test(encodedAssetData)) {
        return assetDataUtils.decodeERC721AssetData(encodedAssetData);
    } else if (multiAsset.test(encodedAssetData)) {
        return decodeMultiAssetData(encodedAssetData);
    }
}

function decodeMultiAssetData(encodedAssetData: string): DecodeAssetData {
    const multiAssetData = assetDataUtils.decodeMultiAssetData(encodedAssetData);
    const assets = multiAssetData.nestedAssetData;
    const result = [];
    for (let i = 0; i < assets.length; i++) {
        const assetData = decodeAssetData(assets[i]);
        result.push({
            tokenAddress: assetData.tokenAddress,
            amounts: multiAssetData.amounts[i],
        });
    }
    const sorted = result.sort((a, b) => (a.tokenAddress > b.tokenAddress) ? 1 : ((b.tokenAddress > a.tokenAddress) ? -1 : 0));
    const amounts = sorted.map(r => r.amounts);
    const addresses = sorted.map(r => r.tokenAddress).join('+');
    return {
        assetProxyId: multiAssetData.assetProxyId,
        tokenAddress: addresses,
        amounts,
    };
}
