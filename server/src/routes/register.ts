/** Express router providing login related routes
 * @module server/routes/register
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
 * @name post/register
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
		).isLength({ min: 6 })
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
		} else {
			try {
				const { name, email, password, location } = req.body;
				const existingUser = await getUserByEmail(email);
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

					const newUser = await createUser(name, email, hash, avatar, location);
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
