import { WSClient } from '@0x/mesh-rpc-client';

import { Config } from './config';

export class MeshConnection {
    public async init(): Promise<WSClient> {
        return new WSClient(this.config.mesh.connectionString);
    }
    constructor(private readonly config: Config) {}
}
