import { ICryptoTransactionInput } from '../../utils/types';
import db from '../index';

const createCryptoTransaction = async (
	portfolioId: number | string,
	transaction: ICryptoTransactionInput
) => {
	// @TODO: Break this 100 line function into reasonable size

	//ID's of invalid rows on partial failure
	let transactionId: string;
	let cryptoPortfolioId: string;

	//Check user has enough cash for buying, crypto for selling first
	if (transaction.type === 'buy') {
		const cashAvailable = await db.query(
			`
			SELECT cash from portfolios
			WHERE id = $1
		`,
			[portfolioId]
		);

		if (cashAvailable.rows[0].cash < transaction.value)
			return { error: 'You too damn broke son' };
	} else if (transaction.type === 'sell') {
		const cryptoAvailable = await db.query(
			`
			SELECT quantity from portfolios_cryptos
			WHERE portfolio_id = $1 AND crypto_id = $2
			`,
			[portfolioId, transaction.crypto_id]
		);

		//If nothing came back (no crypto) or too little
		if (
			!cryptoAvailable.rows[0] ||
			cryptoAvailable.rows[0].quantity < transaction.quantity
		)
			return { error: "You can't sell what you ain't got" };
	}

	//If transaction possible, insert transaction, then crypto quantity, then portfolio cash.
	//Catch  statement after each query to track where the transaction fails, and log out the
	//invalid ID's for correction, to catch partial updates
	return db
		.query(
			`
			INSERT INTO crypto_transactions(portfolio_id, crypto_id, quantity, type, value)
			VALUES ($1, $2, $3, $4, $5)
			RETURNING id;
		`,
			[
				portfolioId,
				transaction.crypto_id,
				transaction.quantity,
				transaction.type,
				transaction.value
			]
		)
		.catch((err: Error) => {
			console.error(`Transaction failed. Nothing updated in DB`);
			throw err;
		})
		.then((id: string) => {
			transactionId = id;
			//currently just using buy/sell checking. Add quantity if buying, subtract for selling
			let quantity =
				transaction.type === 'buy'
					? transaction.quantity
					: -transaction.quantity;
			return db.query(
				`
				INSERT INTO portfolios_cryptos(portfolio_id, crypto_id, quantity)
				VALUES ($1, $2, $3)
				ON CONFLICT(portfolio_id, crypto_id) DO
				UPDATE SET quantity = portfolios_cryptos.quantity + $3
				RETURNING id;
			`,
				[portfolioId, transaction.crypto_id, quantity]
			);
		})
		.catch((err: Error) => {
			console.error(
				`Transaction failed. Transaction with id ${transactionId} not added to portfolios_cryptos or portfolios table.`
			);
			throw err;
		})
		.then((id: string) => {
			cryptoPortfolioId = id;
			let cashChange: number =
				transaction.type === 'buy'
					? -Number(transaction.value)
					: Number(transaction.value);
			return db.query(
				`
				UPDATE portfolios
				SET
					cash = cash + ROUND($1, 4),
					buying_power = buying_power + ROUND($1, 4)
				WHERE
					portfolios.id = $2
				RETURNING id;
		`,
				[cashChange, portfolioId]
			);
		})
		.catch((err: Error) => {
			console.error(`Transaction failed. Transaction with id ${transactionId} not updated in portfolios table.
			portfolios_cryptos id: ${cryptoPortfolioId}`);
			throw err;
		});
};

export default createCryptoTransaction;
