/** Express router providing logout related routes
 * @module server/routes/logout
 * @memberof server
 * @requires express
 */

import express from 'express';
const logout = express.Router();

/**
 * Route removing login credentials
 * @name delete/logout
 * @function
 * @param {String} path Express path
 * @param {Function} middleware Callback function used as middleware
 */
logout.delete('/', (req, res) => {});

module.exports = logout;
