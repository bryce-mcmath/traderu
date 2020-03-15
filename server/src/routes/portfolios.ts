/** Express router providing portfolio related routes
 * @module server/routes/portfolios
 * @memberof server
 * @requires express
 */

import express, { Request, Response } from 'express';
const portfolios = express.Router();

/**
 * Route fetching current user's portfolios
 * @name get/portfolios
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
portfolios.get('/', async (req: Request, res: Response) => {
	// @TODO
	// check session
	// if all good, 200 + JSON array of portfolios
	// else send back error code and JSON msg
});

/**
 * Route creating new portfolio
 * @name post/portfolios
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
portfolios.post('/', async (req: Request, res: Response) => {
	// @TODO
	// check session
	// check that portfolio name not already in use by user
	// if all good, create portfolio, send back 200 + JSON msg
	// else send back error code and JSON msg
});

/**
 * Route fetching specific current user portfolio
 * @name get/portfolios/:id
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
portfolios.get('/:id', async (req: Request, res: Response) => {
	// @TODO
	// see Wiki
});

/**
 * Route fetching specific current user portfolio
 * @name delete/portfolios/:id
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
portfolios.delete('/:id', async (req: Request, res: Response) => {
	// @TODO
	// check session
	// if all good, attempt to delete portfolio and send back status + JSON msg
});

/**
 * Route handling manual get request (not Vue route) for stock transaction
 * @name get/portfolios/:id/stock-transaction
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
portfolios.post(
	'/:id/stock-transaction',
	async (req: Request, res: Response) => {
		// @TODO
		// see Wiki
	}
);

/**
 * Route creating new transaction
 * @name post/portfolios/:id/stock-transaction
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
portfolios.post(
	'/:id/stock-transaction',
	async (req: Request, res: Response) => {
		// @TODO
		// see Wiki
	}
);

module.exports = portfolios;
