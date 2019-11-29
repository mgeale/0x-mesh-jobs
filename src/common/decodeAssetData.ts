import { BigNumber } from '@0x/mesh-rpc-client';
import { assetDataUtils, AssetData, StaticCallAssetData } from '@0x/order-utils';

export declare type DecodedAssetData = AssetData & {
    id: string;
};

export function decodeAssetData(encodedAssetData: string): DecodedAssetData {
    const decodedAssetData = assetDataUtils.decodeAssetDataOrThrow(encodedAssetData);

    if (assetDataUtils.isMultiAssetData(decodedAssetData)) {
        const decodedMultiAssetData = assetDataUtils.decodeMultiAssetDataRecursively(encodedAssetData);
        const ids = decodedMultiAssetData.nestedAssetData.map(d => {
            if (assetDataUtils.isStaticCallAssetData(d)) return d.callTarget;
            return d.tokenAddress;
        });
        return {
            id: ids.sort().join('+'),
            ...decodedMultiAssetData
        };
    }

    if (assetDataUtils.isStaticCallAssetData(decodedAssetData)) {
        return {
            id: decodedAssetData.callTarget,
            ...decodedAssetData
        };
    }

    return {
        id: decodedAssetData.tokenAddress,
        ...decodedAssetData
    };
}
