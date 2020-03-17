/** Express router providing stock related routes
 * @module server/routes/stocks
 * @memberof server
 * @requires express
 */

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
		console.log(stocks)
	} catch (error){
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
