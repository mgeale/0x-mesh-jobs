import { assetDataUtils } from '@0x/order-utils';
import * as fs from 'fs';
import * as path from 'path';

// https://github.com/kvhnuke/etherwallet/blob/mercury/app/scripts/tokens/ethTokens.json

export interface EthToken {
    address: string;
    symbol: string;
    decimal: number;
    type: string;
}

export class TokenData {
    private readonly _tokens;

    public static getEthTokens(): EthToken[] {
        const filePath = path.join(__dirname, '../../tokenData/ethTokens.json');
        const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
        return JSON.parse(content);
    }

    constructor() {
        this._tokens = TokenData.getEthTokens();
    }

    public toTokenSymbol(encodedAssetData: string): string {
        const regEx = new RegExp('^0xf47261b0');
        if (regEx.test(encodedAssetData)) {
            const token = assetDataUtils.decodeERC20AssetData(encodedAssetData);
            const assetData = this._tokens.find(t => t.address.toLowerCase() === token.tokenAddress.toLowerCase());
            return assetData ? assetData.symbol : null;
        }
        return encodedAssetData;
    }
}
