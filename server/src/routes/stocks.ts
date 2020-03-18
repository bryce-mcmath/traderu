/** Express router providing stock related routes
 * @module server/routes/stocks
 * @memberof server
 * @requires express
 */

 interface stockInfo {
	 stockdata: object,
	 name: string,
	 stockData: object
 }

import express, { Request, Response } from 'express';
import getAllStocks from '../db/selects/getAllStocks'
const stocks = express.Router();

/**
 * Route fetching all stocks
 * @name get/stocks
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
stocks.get('/', async (req: Request, res: Response) => {
	try{
		const stocks = await getAllStocks();

		//Sort returned API data. Converts objects to arrays, sort them by date,
		//then convert back to objects
		const intradayDataOrdered = stocks.rows.map((stockInfo: stockInfo) => {
			return Object.entries(stockInfo.stockdata).sort((a,b) => {
					return (new Date(b[0])).valueOf() - (new Date(a[0])).valueOf();
			}).map(arr => ({time: arr[0], data: arr[1]}))
		});

		const stockData = stocks.rows.map((info: object,i: number) => (
			{...info, 
					currentValue: intradayDataOrdered[i][0], 
					stockdata:intradayDataOrdered[i]}));

		res.json(stockData);
	}
	catch (error) {
		console.error('Error in GET -> /leaderboard:', error);
		res.status(500).json({
				errors: [
						{
								msg: 'Sorry! There was an error on our side. We might be serving more users than we can handle right now.'
						}
				]
		});
	}
});

/**
 * Route fetching specific stock
 * @name get/stocks/:symbol
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
stocks.get('/:symbol', async (req: Request, res: Response) => {
	// @TODO
	// see Wiki
});

module.exports = stocks;
