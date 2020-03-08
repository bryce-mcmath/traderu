/** Express router providing login related routes
 * @module server/routes/register
 * @memberof server
 * @requires express
 */

import express from 'express';
const register = express.Router();

/**
 * Route creating a new user
 * @name post/register
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
register.post('/', (req, res) => {});

module.exports = register;
