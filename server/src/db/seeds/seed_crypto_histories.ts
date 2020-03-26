import axios from 'axios';
import db from '../index';
import { IQuery, ICrypto } from '../../utils/types';

const cryptoData = [
	{ name: 'Bitcoin', symbol: 'BTC' },

	{ name: 'Bitcoin-Cash', symbol: 'BCH' },

	{ name: 'Ethereum', symbol: 'ETH' },

	{ name: 'Ethereum-Classic', symbol: 'ETC' },

	{ name: 'Ripple', symbol: 'XRP' },

	{ name: 'Litecoin', symbol: 'LTC' },

	{ name: 'DogeCoin', symbol: 'DOGE' }
];

//returns the query string and params for a single cryptos intraday, daily, and weekly data
const buildCryptoQueries = (crypto: ICrypto) => {
	const queries: IQuery[] = [];

	const apiFunctions = ['DIGITAL_CURRENCY_DAILY', 'DIGITAL_CURRENCY_WEEKLY'];
	const market = 'USD';
	const cryptoSymbol = crypto.symbol;

	const urlDaily = `https://www.alphavantage.co/query?function=${apiFunctions[0]}&symbol=${cryptoSymbol}&market=${market}&apikey=${process.env.ALPHA_VANTAGE_KEY}`;
	const urlWeekly = `https://www.alphavantage.co/query?function=${apiFunctions[1]}&symbol=${cryptoSymbol}&market=${market}&apikey=${process.env.ALPHA_VANTAGE_KEY}`;

	return Promise.all([axios.get(urlDaily), axios.get(urlWeekly)]).then(
		resultsArray => {
			//Push each result into queries in form {query, params}. Note APIfunction name is same as DB col name
			apiFunctions.forEach((apiFunction, i) => {
				queries.push({
					query: `
            insert into crypto_histories (${apiFunction}, crypto_id)
            values ($1, (select id from cryptos where symbol = '${cryptoSymbol}'))
            on conflict (crypto_id) do
            update set ${apiFunction} = $1`,
					params: [resultsArray[i].data]
				});
			});
			return queries;
		}
	);
};

const runscryptosQueries = (cryptos: ICrypto[]) => {
	//allQueries of form [ {query, params}, {query,params}, ...]
	let allQueries: IQuery[] = [];
	let i = 0;
	//Interval used to avoid API call limits
	const buildQueryInterval = setInterval(async () => {
		//buildcryptoQueries returns [ {query1, params1}, {query2, params2}, {query3, params3} ]
		const queries = await buildcryptoQueries(cryptos[i]);
		console.log(`API call ${i} completed`);
		allQueries = [...allQueries, ...queries];
		i++;
		if (i === cryptos.length) {
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

runscryptosQueries(testcryptoData);
