/** Express router providing crypto related routes
 * @module server/routes/cryptos
 * @memberof server
 * @requires express
 */

import express, { Request, Response } from 'express';
import getAllCryptos from '../db/selects/getAllCryptos';
import { getCryptoDaily, getCryptoWeekly } from '../db/selects/getCrypto';
import { ICryptoInfo } from '../utils/types';
const cryptos = express.Router();

/**
 * Route fetching all cryptos
 * @name get/cryptos
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
cryptos.get('/', async (req: Request, res: Response) => {
	try {
		const cryptos = await getAllCryptos();

		//Sort returned API data. Converts objects to arrays, sort them by date,
		//then convert back to objects
		const intradayDataOrdered = cryptos.rows.map((cryptoInfo: ICryptoInfo) => {
			return Object.entries(cryptoInfo.cryptodata)
				.sort((a, b) => {
					return new Date(b[0]).valueOf() - new Date(a[0]).valueOf();
				})
				.map(arr => ({ time: arr[0], data: arr[1] }));
		});

		const cryptoData = cryptos.rows.map((info: object, i: number) => ({
			...info,
			currentValue: intradayDataOrdered[i][0],
			cryptodata: intradayDataOrdered[i]
		}));

		res.json(cryptoData);
	} catch (error) {
		console.error('Error in GET -> /leaderboard:', error);
		res.status(500).json({
			errors: [
				{
					msg:
						'Sorry! There was an error on our side. We might be serving more users than we can handle right now.'
				}
			]
		});
	}
});

/**
 * Route fetching specific crypto
 * @name get/cryptos/:symbol/daily
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
cryptos.get(
	['/:symbol/daily', '/:symbol'],
	async (req: Request, res: Response) => {
		try {
			const crypto = await getCryptoDaily(req.params.symbol);
			const cryptoDataOrganized = Object.entries(crypto.rows[0].cryptodata)
				.sort((a, b) => {
					return new Date(b[0]).valueOf() - new Date(a[0]).valueOf();
				})
				.map(arr => ({ time: arr[0], data: arr[1] }));
			res.send({ ...crypto.rows[0], cryptoData: cryptoDataOrganized });
		} catch (error) {
			console.error('Error in GET -> /cryptos/:symbol/daily', error);
			res.status(500).json({
				errors: [
					{
						msg:
							'Sorry! There was an error on our side. We might be serving more users than we can handle right now.'
					}
				]
			});
		}
	}
);

/**
 * Route fetching specific crypto info by the week
 * @name get/cryptos/:symbol/weekly
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
cryptos.get('/:symbol/weekly', async (req: Request, res: Response) => {
	try {
		const crypto = await getCryptoWeekly(req.params.symbol);
		const cryptoDataOrganized = Object.entries(crypto.rows[0].cryptodata)
			.sort((a, b) => {
				return new Date(b[0]).valueOf() - new Date(a[0]).valueOf();
			})
			.map(arr => ({ time: arr[0], data: arr[1] }));
		res.send({ ...crypto.rows[0], cryptoData: cryptoDataOrganized });
	} catch (error) {
		console.error('Error in GET -> /cryptos/:symbol/weekly', error);
		res.status(500).json({
			errors: [
				{
					msg:
						'Sorry! There was an error on our side. We might be serving more users than we can handle right now.'
				}
			]
		});
	}
});

module.exports = cryptos;
