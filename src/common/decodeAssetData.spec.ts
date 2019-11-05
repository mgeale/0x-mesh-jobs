import { BigNumber } from '@0x/mesh-rpc-client';

import { AssetAddress, EncodedAssets } from '../test/assetData';

import { decodeAssetData } from './decodeAssetData';

describe('decode asset data', () => {
    const erc20ProxyId = '0xf47261b0';
    const erc721ProxyId = '0x02571792';
    const multiAsset = '0x94cfcdd7';

    it('should decode erc20', () => {
        const result = decodeAssetData(EncodedAssets.Dai);
        expect(result).toEqual({
            assetProxyId: erc20ProxyId,
            tokenAddress: AssetAddress.Dai,
        });
    });

    it('should decode erc721 asset', () => {
        const result = decodeAssetData(EncodedAssets.Ens);
        expect(result.assetProxyId).toEqual(erc721ProxyId);
        expect(result.tokenAddress).toEqual(AssetAddress.Ens);
    });

    it('should decode multi asset', () => {
        const amount = new BigNumber(1);
        const result = decodeAssetData(EncodedAssets.AtomMulti);
        expect(result.assetProxyId).toEqual(multiAsset);
        expect(result.tokenAddress).toEqual([AssetAddress.Atom, AssetAddress.Atom, AssetAddress.Atom].join('+'));
        expect(result.amounts).toEqual([amount, amount, amount]);
    });
});
