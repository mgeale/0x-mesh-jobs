import * as path from 'path';
import {Config} from './config';
import {DbConnection} from './dbConnection';
import {MeshConnection} from './meshConnection';
import {HistoricalDataService} from './services/historicalDataService';

const config = new Config(path.join(__dirname, '../config.json'))

const dbConnection = new DbConnection(config);
console.log("db connection opened");
const meshConnection = new MeshConnection(config);
console.log("mesh connection opened");
const historicalDataService = new HistoricalDataService(dbConnection, meshConnection);
historicalDataService.saveTotalOrdersOnTheHour();


dbConnection.dispose();
console.log("db connection closed");
