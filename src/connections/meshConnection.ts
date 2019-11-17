import { WSClient } from '@0x/mesh-rpc-client';

import { Config } from '../config';
import { logger } from '../common/logger';

let connectionIfExists: WSClient | undefined;

export function getMeshConnection(): WSClient {
    if (!connectionIfExists) {
        throw new Error('Mesh connection not initialized');
    }
    return connectionIfExists;
}

export async function initMeshConnectionAsync(config: Config): Promise<void> {
    if (connectionIfExists) {
        throw new Error('Mesh connection already exists');
    }
    connectionIfExists = new WSClient(config.meshConnectionUrl);
    logger.info('Mesh connection created');
}
