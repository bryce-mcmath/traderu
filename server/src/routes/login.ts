/** Express router providing login related routes
 * @module server/routes/login
 * @memberof server
 * @requires express
 */
require('dotenv').config();
import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getUserByEmail from '../db/selects/getUserByEmail';

const login = express.Router();

/**
 * Route verifying login credentials
 * @name post/login
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
login.post(
	'/',
	[
		check('email', 'A valid email is required').isEmail(),
		check('password', 'Password is required').exists()
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;
		const formattedEmail = email.toLowerCase();
		try {
			const user = await getUserByEmail(formattedEmail);

			// Check if email is associated with an account
			if (!user) {
				return (
					res
						// Status Code 400: Bad Request
						.status(400)
						.json({ errors: [{ msg: 'Invalid email or password' }] })
				);
			}

			// Compare entered password with encrypted password in db
			const passwordCorrect = await bcrypt.compare(
				password,
				user.password_hash
			);

			// Return error if password is incorrect
			if (!passwordCorrect) {
				return (
					res
						// Status Code 400: Bad Request
						.status(400)
						.json({ errors: [{ msg: 'Invalid email or password' }] })
				);
			}

			// Create payload
			const payload = {
				user: {
					id: user.id
				}
			};

			if (process.env.JWT_SECRET) {
				jwt.sign(
					payload,
					process.env.JWT_SECRET,
					{ expiresIn: 36000 },
					(err, token) => {
						if (err) throw err;
						res.json({ token });
					}
				);
			} else {
				throw new Error(
					// users must NEVER see errors like this, we just log these sorts on the server side
					'JWT_SECRET NOT DEFINED; You may have forgotten to add it to your .env'
				);
			}
		} catch (error) {
			console.error('Error in POST -> /login:', error);
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

module.exports = login;
