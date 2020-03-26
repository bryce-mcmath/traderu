import db from '../index';

export function getCryptoDaily(symbol: string) {
	return db.query(
		`
  SELECT name, symbol,
  digital_currency_daily -> 'Time Series (Digital Currency Daily)' as cryptoData
  FROM
    cryptos JOIN crypto_histories
    ON cryptos.id = crypto_histories.crypto_id
  WHERE cryptos.symbol = $1
    `,
		[symbol]
	);
}

export function getCryptoWeekly(symbol: string) {
	return db.query(
		`
  SELECT name, symbol,
  digital_currency_weekly -> 'Time Series (Digital Currency Weekly)' as cryptoData
  FROM
    cryptos JOIN crypto_histories
    ON cryptos.id = crypto_histories.crypto_id
  WHERE cryptos.symbol = $1
    `,
		[symbol]
	);
}
