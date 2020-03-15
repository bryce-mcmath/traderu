/** Express router providing login related routes
 * @module server/routes/register
 * @memberof server
 * @requires express
 */

import express, { Request, Response } from 'express';
const register = express.Router();

/**
 * Route creating a new user
 * @name post/register
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
register.post('/', async (req: Request, res: Response) => {
	// @TODO
	// check if email is taken
	// check if password and confirm-password match
	// if all good, create account, give jwt, 200 status, and nice JSON msg
	// otherwise send appropriate status code and JSON msg
});

module.exports = register;
