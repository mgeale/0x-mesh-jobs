import { WSClient } from '@0x/mesh-rpc-client';
import { Config } from './config';

export class MeshConnection {

    constructor(config: Config) {
        return new WSClient(config.mesh.connectionString);
    }
}
