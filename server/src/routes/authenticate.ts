/** Express router for validating JWTs
 * @module app/routes/api/authenticate
 * @memberof app
 * @requires express
 */
require('dotenv').config();
import express, { Response } from 'express';
import getUserById from '../db/selects/getUserById';
import auth from '../middleware/auth';
import { IAuthRequest } from '../utils/types';

const authenticate = express.Router();

/**
 * Route getting user info if they're logged in
 * @name get/authenticate
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
authenticate.get('/', auth, async (req: IAuthRequest, res: Response) => {
	try {
		if (!req.user)
			throw new Error(
				'Someone is trying to get user info without being properly authenticated'
			);
		const user = await getUserById(req.user.id);
		res.json({
			user: {
				name: user.name,
				email: user.email,
				avatar: user.avatar,
				latitude: user.latitude,
				longitude: user.longitude,
				created_at: user.created_at
			}
		});
	} catch (error) {
		console.error('Error in GET -> /authenticate:', error);
	}
});

module.exports = authenticate;
