/** Express router providing login related routes
 * @module server/routes/api/register
 * @memberof server
 * @requires express
 */

require('dotenv').config();
import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import getUserByEmail from '../db/selects/getUserByEmail';
import createUser from '../db/inserts/createUser';

const register = express.Router();
const salt = process.env.SALT ? parseInt(process.env.SALT) : 10;

/**
 * Route creating a new user
 * @name post/api/register
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
register.post(
	'/',
	[
		check('name', 'A name is required')
			.not()
			.isEmpty(),
		check('email', 'A valid email is required').isEmail(),
		check(
			'password',
			'Please enter a password with at least 6 characters'
		).isLength({ min: 6 }),
		check(
			'location',
			'If a location is not empty, it must be an object with longitude and latitude'
		).custom(
			(location, { req }) =>
				!location ||
				(typeof location === 'object' &&
					typeof location.longitude === 'string' &&
					typeof location.latitude === 'string')
		)
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
		} else {
			try {
				const { name, email, password, location } = req.body;
				if (location) console.log(location.latitude, location.longitude);
				const existingUser = await getUserByEmail(email.toLowerCase());

				if (existingUser) {
					res
						.status(400)
						.json({ errors: [{ msg: 'That email has already been taken' }] });
				} else {
					const hash = await bcrypt.hash(password, salt);

					// Set avatar, use default if gravatar doesn't exist
					// @TODO set the default to a random character from The Big Short or Wall Street or Limitless lol
					const avatar = gravatar.url(email, {
						s: '200',
						r: 'pg',
						d: 'mm'
					});

					const newUser = location
						? await createUser(name, email, hash, avatar, location)
						: await createUser(name, email.toLowerCase(), hash, avatar);

					const payload = {
						user: {
							id: newUser.id
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
				}
			} catch (error) {
				console.error('Error in /register:', error);
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
	}
);

module.exports = register;
