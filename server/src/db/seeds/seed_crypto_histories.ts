import axios from 'axios';
import db from '../index';
import { IQuery, IStock } from '../../utils/types';

const cryptoData = [
	{ name: 'Bitcoin', symbol: 'BTC' },

	{ name: 'Bitcoin-Cash', symbol: 'BCH' },

	{ name: 'Ethereum', symbol: 'ETH' },

	{ name: 'Ethereum-Classic', symbol: 'ETC' },

	{ name: 'Ripple', symbol: 'XRP' },

	{ name: 'Litecoin', symbol: 'LTC' },

	{ name: 'DogeCoin', symbol: 'DOGE' }
];

//returns the query string and params for a single stocks intraday, daily, and weekly data
const buildStockQueries = (stock: IStock) => {
	const queries: IQuery[] = [];

	const apiFunctions = [
		'TIME_SERIES_INTRADAY',
		'TIME_SERIES_DAILY',
		'TIME_SERIES_WEEKLY'
	];

	const stockSymbol = stock.symbol;
	const urlIntraday = `https://www.alphavantage.co/query?function=${apiFunctions[0]}&symbol=${stockSymbol}&interval=5min&apikey=${process.env.ALPHA_VANTAGE_KEY}`;
	const urlDaily = `https://www.alphavantage.co/query?function=${apiFunctions[1]}&symbol=${stockSymbol}&interval=5min&apikey=${process.env.ALPHA_VANTAGE_KEY}`;
	const urlWeekly = `https://www.alphavantage.co/query?function=${apiFunctions[2]}&symbol=${stockSymbol}&interval=5min&apikey=${process.env.ALPHA_VANTAGE_KEY}`;

	return Promise.all([
		axios.get(urlIntraday),
		axios.get(urlDaily),
		axios.get(urlWeekly)
	]).then(resultsArray => {
		//Push each result into queries in form {query, params}. Note APIfunction name is same as DB col name
		apiFunctions.forEach((apiFunction, i) => {
			queries.push({
				query: `
            insert into stock_histories (${apiFunction}, stock_id)
            values ($1, (select id from stocks where symbol = '${stockSymbol}'))
            on conflict (stock_id) do
            update set ${apiFunction} = $1`,
				params: [resultsArray[i].data]
			});
		});
		return queries;
	});
};

const runsStocksQueries = (stocks: IStock[]) => {
	//allQueries of form [ {query, params}, {query,params}, ...]
	let allQueries: IQuery[] = [];
	let i = 0;
	//Interval used to avoid API call limits
	const buildQueryInterval = setInterval(async () => {
		//buildStockQueries returns [ {query1, params1}, {query2, params2}, {query3, params3} ]
		const queries = await buildStockQueries(stocks[i]);
		console.log(`API call ${i} completed`);
		allQueries = [...allQueries, ...queries];
		i++;
		if (i === stocks.length) {
			clearInterval(buildQueryInterval);
			runQueries(allQueries);
		}
	}, 65000);
};

//allQueries of form [ {query, params}, {query,params}, ...]
const runQueries = async (allQueries: IQuery[]) => {
	for (const queryInfo of allQueries) {
		await db.query(queryInfo.query, queryInfo.params);
	}
	console.log('done');
	process.exit();
};

runsStocksQueries(testStockData);
