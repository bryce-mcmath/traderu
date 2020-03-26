import db from '../index';

const getAllCryptos = () => {
	return db.query(`
  SELECT name, symbol,
  digital_currency_daily -> 'Time Series (Digital Currency Daily)' as cryptoData
  FROM
    cryptos JOIN crypto_histories
    ON cryptos.id = crypto_histories.crypto_id
    `);
};

export default getAllCryptos;
