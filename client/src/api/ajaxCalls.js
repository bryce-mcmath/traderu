import Axios from 'axios';

export default {
  loginAuth(email = '', password = '') {
    return Axios.post('/api/login', {
      email: email,
      password: password
    })
      .then(response => response.data)
      .catch(err => err);
  },

	fetchStocksData() {
		return Axios.get('/api/stocks').then(res => {
			return res.data.map(stockObject => {
				return {
					name: stockObject.name,
					symbol: stockObject.symbol,
					prices: stockObject.stockdata.map(stock =>
						Number(stock.data['4. close'])
					)
				};
			});
		});
	},

	fetchPortfolioData() {
		return Axios.get('/api/portfolios').then(res => res.data);
	},

	fetchRankingsData() {
		return Axios.get('/api/leaderboard').then(res => {
			console.log(res.data.rankings);
			return res.data.rankings;
		});
	},

	postPortfolio(name) {
		return Axios.post('/api/portfolios', {"portfolioName": name})
	},

	deletePortfolio(id) {
		return Axios.delete(`/api/portfolios/${id}`)
	}
};
