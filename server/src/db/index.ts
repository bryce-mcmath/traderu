/**
 * Configures database and exports querying function
 * @module db
 * @requires dotenv
 * @requires pg
 */

require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default {
	/**
	 * Method used to query cloud database
	 * @name query
	 * @function
	 * @param {String} text Query string
	 * @param {Array} params Array of parameters to be sanitized before input
	 * @returns {Promise} Pool query promise
	 */
	query: (text: string, params?: any[]) => pool.query(text, params)
};
