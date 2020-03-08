require('dotenv').config();
const { BUILD_ENV } = process.env;
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import hist from 'connect-history-api-fallback';
import bodyParser from 'body-parser';
const app: Application = express();

// Local vs deployed config
const PORT = process.env.PORT || 8080;
const ENV = BUILD_ENV || 'production';
console.log('Running environment:', ENV);

// Initialize middleware
app.use(hist());
app.use(helmet());
app.use(xss());
app.use(express.static('dist'));
app.use(express.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Route serving base application
 * @name get/
 * @function
 * @param {String} path Express path
 * @param {Function} middleware Callback function used as middleware
 */
app.get('/', (_: Request, res: Response) => {
	res.render('../dist/index.html');
});

// Routers
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));

/**
 * Catch route to deal with unhandled GETs
 * @name get/*
 * @function
 * @param {String} path Express path
 * @param {Function} middleware Callback function used as middleware
 */
app.get('/*', (_: Request, res: Response) => {
	res.redirect('/');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
