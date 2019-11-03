import { BigNumber } from '@0x/mesh-rpc-client';
import { decodeAssetData } from './decodeAssetData';
import { AssetAddress, EncodedAssets } from '../test/assetData';

describe('decode asset data', () => {
    const erc20ProxyId = '0xf47261b0';
    const erc721ProxyId = '0x02571792';

    it('should decode erc20', () => {
        const result = decodeAssetData(EncodedAssets.Dai);
        expect(result.length).toEqual(1);
        expect(result[0]).toEqual({
            assetProxyId: erc20ProxyId,
            tokenAddress: AssetAddress.Dai
        });
    });

    it('should decode erc721 asset', () => {
        const result = decodeAssetData(EncodedAssets.Ens);
        expect(result.length).toEqual(1);
        expect(result[0].assetProxyId).toEqual(erc721ProxyId);
        expect(result[0].tokenAddress).toEqual(AssetAddress.Ens);
    });

    it('should decode multi asset', () => {
        const amount = new BigNumber(1);
        const result = decodeAssetData(EncodedAssets.AtomMulti);
        expect(result.length).toEqual(3);
        expect(result[0]).toEqual({
            assetProxyId: erc721ProxyId,
            tokenAddress: AssetAddress.Atom,
            amount
        });
        expect(result[1]).toEqual({
            assetProxyId: erc721ProxyId,
            tokenAddress: AssetAddress.Atom,
            amount
        });
        expect(result[2]).toEqual({
            assetProxyId: erc721ProxyId,
            tokenAddress: AssetAddress.Atom,
            amount
        });
    });
});
