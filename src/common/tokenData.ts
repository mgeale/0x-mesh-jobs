import { assetDataUtils } from '@0x/order-utils';
import * as fs from 'fs';
import * as path from 'path';
import { AssetProxyId } from './assetData';

// https://github.com/kvhnuke/etherwallet/blob/mercury/app/scripts/tokens/ethTokens.json

export interface Erc20Token {
    address: string;
    symbol: string;
    decimal: number;
    type: string;
}

export interface Erc721Token {
    address: string;
    name: string;
}

export class TokenData {
    private readonly _erc20Tokens;
    private readonly _erc721Tokens;

    public static getErc20Tokens(): Erc20Token[] {
        const filePath = path.join(__dirname, '../../tokenData/erc20Tokens.json');
        const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
        return JSON.parse(content);
    }

    public static getErc721Tokens(): Erc721Token[] {
        const filePath = path.join(__dirname, '../../tokenData/erc721Tokens.json');
        const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
        return JSON.parse(content);
    }

    constructor() {
        this._erc20Tokens = TokenData.getErc20Tokens();
        this._erc721Tokens = TokenData.getErc721Tokens();
    }

    public toTokenSymbol(encodedAssetData: string): string {
        const erc20RegEx = new RegExp(AssetProxyId.Erc20);
        const erc721RegEx = new RegExp(AssetProxyId.Erc721);
        const multiAsset = new RegExp(AssetProxyId.MultiAsset);

        if (erc20RegEx.test(encodedAssetData)) {
            return this._toErc20Symbol(encodedAssetData);
        } else if (erc721RegEx.test(encodedAssetData)) {
            return this._toErc721Name(encodedAssetData);
        } else if (multiAsset.test(encodedAssetData)) {
            return this._toMultiAsset(encodedAssetData);
        }
    }

    private _toErc20Symbol(encodedAssetData: string): string {
        const token = assetDataUtils.decodeERC20AssetData(encodedAssetData);
        const assetData = this._erc20Tokens.find(t => t.address.toLowerCase() === token.tokenAddress.toLowerCase());
        return assetData ? assetData.symbol : token.tokenAddress;
    }

    private _toErc721Name(encodedAssetData: string): string {
        const token = assetDataUtils.decodeERC721AssetData(encodedAssetData);
        const assetData = this._erc721Tokens.find(t => t.address.toLowerCase() === token.tokenAddress.toLowerCase());
        return assetData ? assetData.name : token.tokenAddress;
    }

    private _toMultiAsset(encodedAssetData: string): string {
        const token = assetDataUtils.decodeMultiAssetData(encodedAssetData);
        const nested = token.nestedAssetData.map(a => {
            return this.toTokenSymbol(a);
        });
        return nested.join('+');
    }
}