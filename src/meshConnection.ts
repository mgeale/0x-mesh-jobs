import { WSClient } from '@0x/mesh-rpc-client';
import { Config } from './config';

export class MeshConnection {
    public meshConnection;

    constructor(config: Config) {
        this.meshConnection = new WSClient(config.mesh.connectionString);
    }
}
