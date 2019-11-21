import { BigNumber } from '@0x/mesh-rpc-client';

import { AssetAddress, EncodedAssets } from '../test/assetData';

import { decodeAssetData } from './decodeAssetData';
import { AssetProxyId } from './assetData';

describe('decode asset data', () => {
    it('should decode erc20', () => {
        const result = decodeAssetData(EncodedAssets.Dai);
        expect(result).toEqual({
            assetProxyId: AssetProxyId.Erc20,
            tokenAddress: AssetAddress.Dai
        });
    });

    it('should decode erc721 asset', () => {
        const result = decodeAssetData(EncodedAssets.Ens);
        expect(result.assetProxyId).toEqual(AssetProxyId.Erc721);
        expect(result.tokenAddress).toEqual(AssetAddress.Ens);
    });

    it('should decode multi asset', () => {
        const amount = new BigNumber(1);
        const result = decodeAssetData(EncodedAssets.AtomMulti);
        expect(result.assetProxyId).toEqual(AssetProxyId.MultiAsset);
        expect(result.tokenAddress).toEqual([AssetAddress.Atom, AssetAddress.Atom, AssetAddress.Atom].join('+'));
        expect(result.amounts).toEqual([amount, amount, amount]);
    });
});
