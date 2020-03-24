import axios from 'axios';

export default {
  async checkAuth() {
    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem(
      'token'
    );
    return axios
      .get('/api/authenticate')
      .then(response => response.data)
      .catch(err => err);
  },

  async loginAuth(email = '', password = '') {
    return axios
      .post('/api/login', {
        email: email,
        password: password
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
          prices: stockObject.stockdata.map(stock =>
            Number(stock.data['4. close'])
          )
        };
      });
    });
  },

  async fetchRankingsData() {
    //Local route for quicker workflow during development
    // return axios.get('http://localhost:8002/api/leaderboard')
    return axios.get('/api/leaderboard').then(res => {
      window.console.log(res.data.rankings);
      return res.data.rankings;
    });
  }
};
