import axios from 'axios';

export default {
  async checkAuth() {
    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem(
      'token'
    );
    return axios
      .get('/api/authenticate')
      .then(response => {
        return response.data;
      })
      .catch(err => err);
  },

  async loginAuth(email = '', password = '') {
    return axios
      .post('/api/login', {
        email,
        password
      })
      .then(response => response.data)
      .catch(err => err);
  },

  async register(name = '', email = '', password = '', location) {
    return axios
      .post('/api/register', {
        email,
        password,
        name,
        location
      })
      .then(response => response.data)
      .catch(err => err);
  },

  async fetchStocksData() {
    //Local route for quicker workflow during development
    // return axios.get('http://localhost:8002/api/stocks')
    return axios.get('/api/stocks').then(res => {
      return res.data.map(stockObject => {
        return {
          name: stockObject.name,
          symbol: stockObject.symbol,
          prices: stockObject.stockdata.map(stock => ({
            time: stock.time,
            price: Number(stock.data['4. close'])
          }))
        };
      });
    });
  },

  async fetchStockData(symbol) {
    let error;
    const intraday = await axios
      .get(`/api/stocks/${symbol}/intraday`)
      .then(res => res.data)
      .catch(err => (error = err));
    const daily = await axios
      .get(`/api/stocks/${symbol}/daily`)
      .then(res => res.data)
      .catch(err => (error = err));
    const weekly = await axios
      .get(`/api/stocks/${symbol}/weekly`)
      .then(res => res.data)
      .catch(err => (error = err));

    if (!error) {
      return {
        intraday,
        daily,
        weekly
      };
    }

    return error;
  },

  async fetchCryptosData() {
    //Local route for quicker workflow during development
    // return axios.get('http://localhost:8002/api/cryptos')
    return axios.get('/api/cryptos').then(res => {
      return res.data.map(cryptoObject => {
        return {
          name: cryptoObject.name,
          symbol: cryptoObject.symbol,
          prices: cryptoObject.cryptodata.map(crypto => ({
            time: crypto.time,
            price: Number(crypto.data['4a. close (USD)'])
          }))
        };
      });
    });
  },

  async fetchCryptoData(symbol) {
    let error;
    const daily = await axios
      .get(`/api/cryptos/${symbol}/daily`)
      .then(res => res.data)
      .catch(err => (error = err));
    const weekly = await axios
      .get(`/api/cryptos/${symbol}/weekly`)
      .then(res => res.data)
      .catch(err => (error = err));

    if (!error) {
      return {
        daily,
        weekly
      };
    }

    return error;
  },

  async fetchRankingsData() {
    //Local route for quicker workflow during development
    // return axios.get('http://localhost:8002/api/leaderboard')
    return axios.get('/api/leaderboard').then(res => {
      return res.data.rankings;
    });
  },

  async fetchPortfolioData() {
    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem(
      'token'
    );
    return axios.get('/api/portfolios').then(res => res.data);
  },

  async postPortfolio(name) {
    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem(
      'token'
    );
    return axios.post('/api/portfolios', { 'portfolioName': name });
  },

  async deletePortfolio(id) {
    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem(
      'token'
    );
    return axios.delete(`/api/portfolios/${id}`);
  },
  async makeStockTransaction(transactionObj, portfolioId) {
    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem(
      'token'
    );
    return axios.post(
      `/api/portfolios/${portfolioId}/stock-transaction`,
      transactionObj
    );
  },
  async makeCryptoTransaction(transactionObj, portfolioId) {
    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem(
      'token'
    );
    return axios.post(
      `/api/portfolios/${portfolioId}/crypto-transaction`,
      transactionObj
    );
  }
};
