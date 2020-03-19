/** Express router providing portfolio related routes
 * @module server/routes/portfolios
 * @memberof server
 * @requires express
 */

import express, { Response } from 'express';
import { check, validationResult } from 'express-validator';
import auth from '../middleware/auth';
import getPortfoliosByUserId from '../db/selects/getPortfoliosByUserId';
import getStockIdBySymbol from '../db/selects/getStockIdBySymbol';
import deletePortfolio from '../db/updates/deletePortfolio';
import createPortfolio from '../db/inserts/createPortfolio';
import createTransaction from '../db/inserts/createTransaction';
import { IAuthRequest } from '../utils/types';

const portfolios = express.Router();

/**
 * Route fetching current user's portfolios
 * @name get/portfolios
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
portfolios.get('/', auth, async (req: IAuthRequest, res: Response) => {
	try {
		if (!req.user)
			throw new Error(
				'Someone is trying to get portfolio info without being properly authenticated'
			);
		const portfolios = await getPortfoliosByUserId(req.user.id);
		res.json(portfolios);
	} catch (error) {
		console.error('Error in GET -> /portfolios:', error);
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
 * Route creating new portfolio
 * @name post/portfolios
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
portfolios.post(
	'/',
	auth,
	[
		check('portfolioName', 'A portfolio name is required')
			.not()
			.isEmpty()
	],
	async (req: IAuthRequest, res: Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
		} else {
			try {
				if (!req.user)
					throw new Error(
						'Someone is trying to create a portfolio without being properly authenticated'
					);
				const newPortfolio = await createPortfolio(
					req.user.id,
					req.body.portfolioName
				);
				res.json(newPortfolio);
			} catch (error) {
				console.error('Error in POST -> /portfolios:', error);
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
	}
);

/**
 * Route deleting specific current user portfolio
 * @name delete/portfolios/:portfolio_id
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
portfolios.delete(
	'/:portfolio_id',
	auth,
	async (req: IAuthRequest, res: Response) => {
		try {
			if (!req.user)
				throw new Error(
					'Someone is trying to delete a portfolio without being properly authenticated'
				);
			const response = await deletePortfolio(
				req.user.id,
				req.params.portfolio_id
			);
			res.json(response);
		} catch (error) {
			console.error('Error in DELETE -> /portfolios/:portfolio_id', error);
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
 * Route creating new transaction
 * @name post/portfolios/:id/stock-transaction
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
portfolios.post(
	// @TODO: Better validation for stock.price when that variable type is confirmed
	// @TODO: Need to check how portfolio and other tables are updated in DB either in this route or in createTransaction
	'/:portfolio_id/stock-transaction',
	auth,
	[
		check('quantity', 'Quantity must be a positive integer').custom(
			(quantity, { req }) => Number.isInteger(quantity) && quantity > 0
		),
		check('stock', 'Stock must include symbol and price').custom(
			(stock, { req }) => typeof stock.symbol === 'string' && stock.price
		),
		check('stock', 'Stock symbol must be 1 - 5 characters long').custom(
			(stock, { req }) => stock.symbol.length > 0 && stock.symbol.length < 6
		),
		check('type', 'Must include a valid transaction type').custom(
			(type, { req }) =>
				(typeof type === 'string' && type.toLowerCase() === 'buy') ||
				(typeof type === 'string' && type.toLowerCase() === 'sell')
		)
	],
	async (req: IAuthRequest, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
		} else {
			try {
				if (!req.user)
					throw new Error(
						'Someone is trying to make a trade without being properly authenticated'
					);
				const stock_id = await getStockIdBySymbol(req.body.stock.symbol);
				if (!stock_id) {
					return res.status(400).json({
						errors: [
							{
								msg:
									"We're sorry, a stock with that symbol does not exist in our database"
							}
						]
					});
				}
				const value = req.body.stock.price * req.body.quantity;
				const response = await createTransaction(req.params.portfolio_id, {
					...req.body,
					stock_id,
					value
				});
				res.json(response);
			} catch (error) {
				console.error(
					'Error in POST -> /portfolios/:portfolio_id/stock-transaction',
					error
				);
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
	}
);

module.exports = portfolios;
