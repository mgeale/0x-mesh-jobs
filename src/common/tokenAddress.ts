import { assetDataUtils } from '@0x/order-utils';
import { AssetProxyId } from './assetData';

export function toTokenAddress(encodedAssetData: string): string {
    const erc20RegEx = new RegExp(AssetProxyId.Erc20);
    const erc721RegEx = new RegExp(AssetProxyId.Erc721);
    const multiAsset = new RegExp(AssetProxyId.MultiAsset);

    if (erc20RegEx.test(encodedAssetData)) {
        const erc20AssetData = assetDataUtils.decodeERC20AssetData(encodedAssetData);
        return erc20AssetData.tokenAddress;
    } else if (erc721RegEx.test(encodedAssetData)) {
        const erc721AssetData = assetDataUtils.decodeERC721AssetData(encodedAssetData);
        return erc721AssetData.tokenAddress;
    } else if (multiAsset.test(encodedAssetData)) {
        const multiAssetData = assetDataUtils.decodeMultiAssetData(encodedAssetData);
        const nestedAssetData = multiAssetData.nestedAssetData.map(a => toTokenAddress(a));
        return nestedAssetData.join('+');
    }
}
