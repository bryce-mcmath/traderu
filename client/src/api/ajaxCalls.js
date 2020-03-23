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
    //Local route for quicker workflow during development
    // return Axios.get('http://localhost:8002/api/stocks')
    return Axios.get('/api/stocks').then(res => {
      return res.data.map(stockObject => {
        return {
          name: stockObject.name,
          prices: stockObject.stockdata.map(stock =>
            Number(stock.data['4. close'])
          )
        };
      });
    });
  },

  fetchStockSymbolData(symbol) {
    //Local route for quicker workflow during development
    // return Axios.get('http://localhost:8002/api/stocks')
    return Axios.get(`/api/stocks/${symbol}`)
      .then(res => res.data)
      .catch(err => err);
  },

  fetchRankingsData() {
    //Local route for quicker workflow during development
    // return Axios.get('http://localhost:8002/api/leaderboard')
    return Axios.get('/api/leaderboard').then(res => {
      console.log(res.data.rankings);
      return res.data.rankings;
    });
  }
};
