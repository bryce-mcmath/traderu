import {
	IStockTransactionInput,
	IStockTransactionOutput
} from '../../utils/types';

const createTransaction = (
	userId: number | string,
	portfolioId: number | string,
	transaction: IStockTransactionInput
) => {
	// @TODO
	const doSomethingWithThis = userId;
	const alsoWithThis = portfolioId;
	const returnedTransaction: IStockTransactionOutput = {
		id: 1,
		portfolio_id: 1,
		stock_id: 1,
		quantity: 30,
		date_time: Date.now().toString(),
		type: 'buy',
		value: '100000'
	};
	return Promise.resolve(returnedTransaction);
};

export default createTransaction;
