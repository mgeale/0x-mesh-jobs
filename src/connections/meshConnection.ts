import { WSClient } from '@0x/mesh-rpc-client';
import * as _ from 'lodash';

import { Config } from '../config';

let connectionIfExists: WSClient | undefined;

export function getMeshConnection(): WSClient {
    if (_.isUndefined(connectionIfExists)) {
        throw new Error('mesh connection not initialized');
    }
    return connectionIfExists;
}

export async function initMeshConnectionAsync(config: Config): Promise<void> {
    if (!_.isUndefined(connectionIfExists)) {
        throw new Error('mesh connection already exists');
    }
    connectionIfExists = new WSClient(config.meshConnectionUrl);
}
