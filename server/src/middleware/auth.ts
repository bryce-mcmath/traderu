/**
 * Decrypts and checks JWT before hitting sensitive routes
 * @module middleware/auth
 * @requires dotenv
 * @requires jsonwebtoken
 * @requires IAuthRequest
 */

const jwt = require('jsonwebtoken');
require('dotenv').config();
import { Response, NextFunction } from 'express';
import { IAuthRequest } from '../utils/types';

/**
 * Decrypts and checks JWT, appends user id to req before sending on to the rest of our middleware
 * @name query
 * @function
 * @param {IAuthRequest} req Custom interface extending the Express request object with our expected types
 * @param {Response} res Express response object
 * @param {NextFunction} next Express next middleware function
 */
const auth = (req: IAuthRequest, res: Response, next: NextFunction) => {
	// Get token from header
	const token = req.header('x-auth-token');
	// Check if no token
	if (!token) {
		return res
			.status(200)
			.json({ errors: [{ message: 'No token, authorization denied' }] });
	}

	try {
		// Verify token using secret
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		// Add user info and pass along to the route
		req.user = decoded.user;
		next();
	} catch (error) {
		res.status(200).json({ errors: [{ message: 'Invalid token' }] });
	}
};

export default auth;
