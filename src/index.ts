import * as path from 'path';
import { Config } from './config';

const config = new Config(path.join(__dirname, '../config.json'), path.join(__dirname, '../.env'));

(async () => {
	console.log(config.meshConnectionString);
})();
