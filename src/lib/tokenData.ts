import * as fs from 'fs';
import * as path from 'path';
import { assetDataUtils } from '@0x/order-utils';

// https://github.com/kvhnuke/etherwallet/blob/mercury/app/scripts/tokens/ethTokens.json

export interface EthToken {
    address: string;
    symbol: string;
    decimal: number;
    type: string;
}

export class TokenData {
    private readonly tokens;

    public static getEthTokens(): EthToken[] {
        const filePath = path.join(__dirname, '../../ethTokens.json');
        const content = fs.readFileSync(filePath, { encoding: 'utf-8' });
        return JSON.parse(content);
    }

    constructor() {
        this.tokens = TokenData.getEthTokens();
    }

    public toTokenSymbol(encodedAssetData: string): string {
        const regEx = new RegExp('^0xf47261b0');
        if (regEx.test(encodedAssetData)) {
            const token = assetDataUtils.decodeERC20AssetData(encodedAssetData);
            const assetData = this.tokens.find(t => t.address.toLowerCase() === token.tokenAddress.toLowerCase());
            return assetData ? assetData.symbol : null;
        }
        return encodedAssetData;
    }
}
