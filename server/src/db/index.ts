/**
 * Configures database and exports querying function
 * @module db
 * @requires dotenv
 * @requires pg
 */

require('dotenv').config();
const { Pool } = require('pg');
const connectionString = process.env.BUILD_ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

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
