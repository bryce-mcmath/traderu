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
login.post('/', (req: Request, res: Response) => {});

module.exports = login;
