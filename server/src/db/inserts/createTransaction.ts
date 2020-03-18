import { IStockTransactionInput } from '../../utils/types';
import db from '../index';

const createTransaction = (
	portfolioId: number | string,
	transaction: IStockTransactionInput
) =>
	// @TODO: Update other tables affected by this transaction
	db
		.query(
			`
			INSERT INTO stock_transactions(portfolio_id, stock_id, quantity, type, value)
			VALUES ($1, $2, $3, $4, $5);
		`,
			[
				portfolioId,
				transaction.stock_id,
				transaction.quantity,
				transaction.type,
				transaction.value
			]
		)
		.then(() => 'Your order has been successfully placed')
		.catch((err: Error) => {
			throw err;
		});

export default createTransaction;
