import * as _ from 'lodash';
import { Connection, createConnection } from 'typeorm';

let connectionIfExists: Connection | undefined;

export function getDBConnection(): Connection {
    if (_.isUndefined(connectionIfExists)) {
        throw new Error('DB connection not initialized');
    }
    return connectionIfExists;
}

export async function initDBConnectionAsync(): Promise<void> {
    if (!_.isUndefined(connectionIfExists)) {
        throw new Error('DB connection already exists');
    }
    connectionIfExists = await createConnection();
}
