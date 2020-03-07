require('dotenv').config();
const { BUILD_ENV, SECRET } = process.env;

const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const app = express();
const hist = require('connect-history-api-fallback');

// Local vs deployed config
const PORT = process.env.PORT || 8080;
const ENV = BUILD_ENV || 'production';
console.log('Running environment ', ENV);

// Initialize middleware
app.use(hist());
app.use(helmet());
app.use(xss());
app.use(express.static('dist'));
app.use(express.json({ extended: false, limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: 'session',
    secret: SECRET,
    maxAge: 24 * 60 * 60 * 1000 // 24HR
  })
);

/**
 * Route serving base application
 * @name get/
 * @function
 * @param {String} path Express path
 * @param {Function} middleware Callback function used as middleware
 */
app.get('/', (_, res) => {
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
app.get('/*', (_, res) => {
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
