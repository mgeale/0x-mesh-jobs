import { BigNumber } from '@0x/mesh-rpc-client';

import { AssetAddress, AssetProxyId, EncodedAsset, TokenId } from '../test/assetData';

import { decodeAssetData } from './decodeAssetData';

describe('decode asset data', () => {
    it('should decode erc20', () => {
        const result = decodeAssetData(EncodedAsset.Dai);
        expect(result).toEqual({
            id: AssetAddress.Dai,
            assetProxyId: AssetProxyId.Erc20,
            tokenAddress: AssetAddress.Dai
        });
    });

    it('should decode erc721 asset', () => {
        const result = decodeAssetData(EncodedAsset.Ens);
        expect(result).toEqual({
            id: AssetAddress.Ens,
            assetProxyId: AssetProxyId.Erc721,
            tokenAddress: AssetAddress.Ens,
            tokenId: new BigNumber(TokenId.Ens)
        });
    });

    it('should decode Atom multi asset', () => {
        const amount = new BigNumber(1);
        const result = decodeAssetData(EncodedAsset.AtomMulti);
        expect(result).toEqual({
            id: [AssetAddress.Atom, AssetAddress.Atom, AssetAddress.Atom].join('+'),
            assetProxyId: AssetProxyId.MultiAsset,
            amounts: [amount, amount, amount],
            nestedAssetData: [
                {
                    assetProxyId: AssetProxyId.Erc721,
                    tokenAddress: AssetAddress.Atom,
                    tokenId: new BigNumber(156)
                },
                {
                    assetProxyId: AssetProxyId.Erc721,
                    tokenAddress: AssetAddress.Atom,
                    tokenId: new BigNumber(414)
                },
                {
                    assetProxyId: AssetProxyId.Erc721,
                    tokenAddress: AssetAddress.Atom,
                    tokenId: new BigNumber(544)
                }
            ]
        });
    });

    it('should decode Mix multi asset', () => {
        const result = decodeAssetData(EncodedAsset.MixMulti);
        expect(result).toEqual({
            id: [AssetAddress.Atom, AssetAddress.Ens, AssetAddress.Dai].sort().join('+'),
            assetProxyId: AssetProxyId.MultiAsset,
            amounts: [new BigNumber(1), new BigNumber(2), new BigNumber(3)],
            nestedAssetData: [
                {
                    assetProxyId: AssetProxyId.Erc721,
                    tokenAddress: AssetAddress.Atom,
                    tokenId: new BigNumber(123)
                },
                {
                    assetProxyId: AssetProxyId.Erc721,
                    tokenAddress: AssetAddress.Ens,
                    tokenId: new BigNumber(123)
                },
                {
                    assetProxyId: AssetProxyId.Erc20,
                    tokenAddress: AssetAddress.Dai
                }
            ]
        });
    });
});
