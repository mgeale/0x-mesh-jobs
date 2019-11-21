import { assetDataUtils, ERC20AssetData, ERC721AssetData, MultiAssetData } from '@0x/order-utils';
import * as fs from 'fs';
import * as path from 'path';

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
        const decodedAssetData = assetDataUtils.decodeAssetDataOrThrow(encodedAssetData)

        if (assetDataUtils.isERC20AssetData(decodedAssetData)) {
            return this._toErc20Symbol(decodedAssetData);
        } else if (assetDataUtils.isERC721AssetData(decodedAssetData)) {
            return this._toErc721Name(decodedAssetData);
        } else if (assetDataUtils.isMultiAssetData(decodedAssetData)) {
            return this._toMultiAsset(decodedAssetData);
        }
    }

    private _toErc20Symbol(decodedAssetData: ERC20AssetData): string {
        const assetData = this._erc20Tokens.find(t => t.address.toLowerCase() === decodedAssetData.tokenAddress.toLowerCase());
        return assetData ? assetData.symbol : decodedAssetData.tokenAddress;
    }

    private _toErc721Name(decodedAssetData: ERC721AssetData): string {
        const assetData = this._erc721Tokens.find(t => t.address.toLowerCase() === decodedAssetData.tokenAddress.toLowerCase());
        return assetData ? assetData.name : decodedAssetData.tokenAddress;
    }

    private _toMultiAsset(decodedAssetData: MultiAssetData): string {
        const nested = decodedAssetData.nestedAssetData.map(a => {
            return this.toTokenSymbol(a);
        });
        return nested.join('+');
    }
}
