/** Express router providing stock related routes
 * @module app/routes/api/stocks
 * @memberof app
 * @requires express
 */

import express, { Request, Response } from 'express';
import getAllStocks from '../db/selects/getAllStocks';
import {
	getStockIntraday,
	getStockDaily,
	getStockWeekly
} from '../db/selects/getStock';
import { IStockInfo } from '../utils/types';
const stocks = express.Router();

/**
 * Route fetching all stocks
 * @name get/stocks
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
stocks.get('/', async (req: Request, res: Response) => {
	try {
		const stocks = await getAllStocks();

		//Sort returned API data. Converts objects to arrays, sort them by date,
		//then convert back to objects
		const intradayDataOrdered = stocks.rows.map((stockInfo: IStockInfo) => {
			return Object.entries(stockInfo.stockdata)
				.sort((a, b) => {
					return new Date(b[0]).valueOf() - new Date(a[0]).valueOf();
				})
				.map(arr => ({ time: arr[0], data: arr[1] }));
		});

		const stockData = stocks.rows.map((info: object, i: number) => ({
			...info,
			currentValue: intradayDataOrdered[i][0],
			stockdata: intradayDataOrdered[i]
		}));

		res.json(stockData);
	} catch (error) {
		console.error('Error in GET -> /leaderboard:', error);
		res.status(500).json({
			errors: [
				{
					message:
						'Sorry! There was an error on our side. We might be serving more users than we can handle right now.'
				}
			]
		});
	}
});

/**
 * Route fetching specific stock
 * @name get/stocks/:symbol/intraday
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
stocks.get(
	['/:symbol/intraday', '/:symbol'],
	async (req: Request, res: Response) => {
		try {
			const stock = await getStockIntraday(req.params.symbol);
			const stockDataOrganized = Object.entries(stock.rows[0].stockdata)
				.sort((a, b) => {
					return new Date(b[0]).valueOf() - new Date(a[0]).valueOf();
				})
				.map(arr => ({ time: arr[0], data: arr[1] }));
			res.send({ ...stock.rows[0], stockData: stockDataOrganized });
		} catch (error) {
			console.error('Error in GET -> /stocks/:id/intraday', error);
			res.status(500).json({
				errors: [
					{
						message:
							'Sorry! There was an error on our side. We might be serving more users than we can handle right now.'
					}
				]
			});
		}
	}
);

/**
 * Route fetching specific stock
 * @name get/stocks/:symbol/daily
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
stocks.get('/:symbol/daily', async (req: Request, res: Response) => {
	try {
		const stock = await getStockDaily(req.params.symbol);
		const stockDataOrganized = Object.entries(stock.rows[0].stockdata)
			.sort((a, b) => {
				return new Date(b[0]).valueOf() - new Date(a[0]).valueOf();
			})
			.map(arr => ({ time: arr[0], data: arr[1] }));
		res.send({ ...stock.rows[0], stockData: stockDataOrganized });
	} catch (error) {
		console.error('Error in GET -> /stocks/:id/daily', error);
		res.status(500).json({
			errors: [
				{
					message:
						'Sorry! There was an error on our side. We might be serving more users than we can handle right now.'
				}
			]
		});
	}
});

/**
 * Route fetching specific stock
 * @name get/stocks/:symbol/weekly
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
stocks.get('/:symbol/weekly', async (req: Request, res: Response) => {
	try {
		const stock = await getStockWeekly(req.params.symbol);
		const stockDataOrganized = Object.entries(stock.rows[0].stockdata)
			.sort((a, b) => {
				return new Date(b[0]).valueOf() - new Date(a[0]).valueOf();
			})
			.map(arr => ({ time: arr[0], data: arr[1] }));
		res.send({ ...stock.rows[0], stockData: stockDataOrganized });
	} catch (error) {
		console.error('Error in GET -> /stocks/:id/weekly', error);
		res.status(500).json({
			errors: [
				{
					message:
						'Sorry! There was an error on our side. We might be serving more users than we can handle right now.'
				}
			]
		});
	}
});

module.exports = stocks;
