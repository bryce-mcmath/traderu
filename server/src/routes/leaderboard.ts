/** Express router providing leaderboard related routes
 * @module server/routes/leaderboard
 * @memberof server
 * @requires express
 */

import express, { Request, Response } from 'express';
import getAllRankings from '../db/selects/getAllRankings'
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
	try{
		const rankings = await getAllRankings();
		res.json({rankings: rankings.rows});
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
 * Route fetching relevant rankings for a given portfolio
 * @name get/leaderboard/:portfolio_id
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
leaderboard.get('/:portfolio_id', async (req: Request, res: Response) => {
	// @TODO
});

module.exports = leaderboard;
