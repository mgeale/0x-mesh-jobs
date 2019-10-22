import { assetDataUtils } from '@0x/order-utils';

export function toTokenAddress(encodedAssetData: string): string {
    const erc20RegEx = new RegExp('^0xf47261b0');
    const erc721RegEx = new RegExp('^0x02571792');
    const multiAsset = new RegExp('^0x94cfcdd7');

    if (erc20RegEx.test(encodedAssetData)) {
        const erc20AssetData = assetDataUtils.decodeERC20AssetData(encodedAssetData);
        return erc20AssetData.tokenAddress;
    } else if (erc721RegEx.test(encodedAssetData)) {
        const erc721AssetData = assetDataUtils.decodeERC721AssetData(encodedAssetData);
        return erc721AssetData.tokenAddress;
    } else if (multiAsset.test(encodedAssetData)) {
        const multiAssetData = assetDataUtils.decodeMultiAssetData(encodedAssetData);
        const nestedAssetData = multiAssetData.nestedAssetData.map(a => this.toTokenAddress(a));
        return nestedAssetData.join('+');
    }
}
