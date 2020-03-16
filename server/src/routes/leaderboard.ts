/** Express router providing leaderboard related routes
 * @module server/routes/leaderboard
 * @memberof server
 * @requires express
 */

import express, { Request, Response } from 'express';
const leaderboard = express.Router();

/**
 * Route fetching all rankings
 * @name get/leaderboard
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
leaderboard.get('/', async (req: Request, res: Response) => {
	// @TODO
	// see Wiki for return format
});

/**
 * Route fetching relevant rankings for a given portfolio
 * @name get/leaderboard/:portfolio_id
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
leaderboard.get('/:portfolio_id', async (req: Request, res: Response) => {
	// @TODO
	// see Wiki for return format
});

module.exports = leaderboard;
