/** Express router providing stock related routes
 * @module server/routes/stocks
 * @memberof server
 * @requires express
 */

import express, { Request, Response } from 'express';
const stocks = express.Router();

/**
 * Route fetching all stocks
 * @name get/stocks
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
stocks.get('/', async (req: Request, res: Response) => {
	// @TODO
	// if all good, send 200 + JSON array of stocks
	// else send back error code and JSON msg
	// see Wiki for format of return data
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
