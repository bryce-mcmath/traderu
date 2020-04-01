/** Express router providing leaderboard related routes
 * @module app/routes/api/leaderboard
 * @memberof app
 * @requires express
 */

import express, { Request, Response } from 'express';
import getAllRankings from '../db/selects/getAllRankings';
import getLocalRankings from '../db/selects/getLocalRankings';
const leaderboard = express.Router();

/**
 * Route fetching all rankings
 * @name get/leaderboard
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
leaderboard.get('/', async (req: Request, res: Response) => {
	try {
		const rankings = await getAllRankings();
		res.json({ rankings: rankings.rows });
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
 * Route fetching relevant rankings for a given portfolio
 * @name get/leaderboard/:portfolio_id
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
leaderboard.get('/:portfolio_id', async (req: Request, res: Response) => {
	try {
		const rankings = await getLocalRankings(req.params.portfolio_id);
		res.json({ rankings: rankings.rows });
	} catch (error) {
		console.error('Error in GET -> /leaderboard/:portfolio_id:', error);
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

module.exports = leaderboard;
