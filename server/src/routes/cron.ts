/** Express router providing crypto related routes
 * @module app/routes/api/cron
 * @memberof app
 * @requires express
 */

import express, { Request, Response } from 'express';
import s from '../db/seeds/seedStockHistories';
import c from '../db/seeds/seedCryptoHistories';
const { stockData, runStockQueries } = s;
const { cryptoData, runCryptoQueries } = c;

const cron = express.Router();

/**
 * Route hit by EB worker every 24hour at 3AM
 * @name post/cron
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
cron.post('/', async (req: Request, res: Response) => {
	try {
		await runCryptoQueries(cryptoData);
		await runStockQueries(stockData);
		res.send('Cron job was a success');
	} catch (error) {
		res.send(`Cron job was a failure: ${error}`);
	}
});

module.exports = cron;
