require('dotenv').config();
import express, { Express, Request, Response } from 'express';
import * as helmet from 'helmet';
import * as hist from 'connect-history-api-fallback';
import bodyParser from 'body-parser';
const app: Express = express();

// Local vs deployed config
const PORT = process.env.PORT || 8080;
const ENV = process.env.BUILD_ENV || 'production';
console.log('Running environment:', ENV);

// Initialize middleware
app.use(helmet.default());
app.use(express.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: false }));

// API Routes
app.use('/api/register', require('./routes/register'));
app.use('/api/login', require('./routes/login'));
app.use('/api/stocks', require('./routes/stocks'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/portfolios', require('./routes/portfolios'));

// Client routes
app.use(hist.default());
app.use(express.static('./server/static'));

/**
 * Route serving base application
 * @name get/
 * @function
 * @param {String} path Express path
 * @param {Function} middleware Callback function used as middleware
 */
app.get('/', (_: Request, res: Response) => {
	res.render('./server/static/index.html');
});

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
