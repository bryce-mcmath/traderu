/** Express router providing logout related routes
 * @module server/routes/logout
 * @memberof server
 * @requires express
 */

import express, { Request, Response } from 'express';
const logout = express.Router();

/**
 * Route removing login credentials
 * @name delete/logout
 * @function
 * @param {String} path Express path
 * @param {Function} middleware Callback function used as middleware
 */
logout.delete('/', async (req: Request, res: Response) => {
	// @TODO
	// remove jwt (could maybe handle this in client... ask Bryce)
});

module.exports = logout;
