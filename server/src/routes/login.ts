/** Express router providing login related routes
 * @module server/routes/login
 * @memberof server
 * @requires express
 */

import express, { Request, Response } from 'express';
const login = express.Router();

/**
 * Route verifying login credentials
 * @name post/login
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
login.post('/', async (req: Request, res: Response) => {
	// @TODO
	// validate
	// if valid, give session, 200, and nice JSON msg
	// otherwise give appropriate status and JSON msg
});

module.exports = login;
