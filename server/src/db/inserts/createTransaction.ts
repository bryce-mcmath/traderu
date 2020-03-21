import { IStockTransactionInput } from '../../utils/types';
import db from '../index';

const createTransaction = async (
	portfolioId: number | string,
	transaction: IStockTransactionInput
) => {
	// @TODO: Break this 100 line function into reasonable size
	
	//ID's of invalid rows on partial failure
	let transactionId: string;
	let stockPortfolioId: string;

	//Check user has enough cash for buying, stock for selling first
	if(transaction.type === "buy"){
		const cashAvailable = await db.query(`
			SELECT cash from portfolios 
			WHERE id = $1
		`, [portfolioId]);

		if(cashAvailable.rows[0].cash < transaction.value)
			return {error: "You too damn broke son"}
	} else 
	
	if(transaction.type === "sell"){
		const stockAvailable = await db.query(`
			SELECT quantity from portfolios_stocks
			WHERE portfolio_id = $1 AND stock_id = $2
			`, [portfolioId, transaction.stock_id]);

		//If nothing came back (no stock) or too little
		if(!stockAvailable.rows[0] || stockAvailable.rows[0].quantity < transaction.quantity)
			return {error: "You can't sell what you ain't got"}
	}

	//If transaction possible, insert transaction, then stock quantity, then portfolio cash.
	//Catch  statement after each query to track where the transaction fails, and log out the
	//invalid ID's for correction, to catch partial updates
	return db
		.query(
			`
			INSERT INTO stock_transactions(portfolio_id, stock_id, quantity, type, value)
			VALUES ($1, $2, $3, $4, $5)
			RETURNING id;
		`,
			[
				portfolioId,
				transaction.stock_id,
				transaction.quantity,
				transaction.type,
				transaction.value
			]
		)
		.catch((err: Error) => {
			console.error(`Transaction failed. Nothing updated in DB`)
			throw err;
		})
		.then((id: string) => {
			transactionId = id;
			//currently just using buy/sell checking. Add quantity if buying, subtract for selling
			let quantity = transaction.type === 'buy' ? transaction.quantity : -transaction.quantity;  
			return db.query(`
				INSERT INTO portfolios_stocks(portfolio_id, stock_id, quantity)
				VALUES ($1, $2, $3)
				ON CONFLICT(portfolio_id, stock_id) DO 
				UPDATE SET quantity = portfolios_stocks.quantity + $3
				RETURNING id;
			`, 
			[
				portfolioId,
				transaction.stock_id,
				quantity
			])
		})
		.catch((err: Error) => {
			console.error(`Transaction failed. Transaction with id ${transactionId} not added to portfolios_stocks or portfolios table.`)
			throw err;
		})
		.then((id: string) => {
			stockPortfolioId = id;
			let cashChange: number = transaction.type === 'buy' ? -Number(transaction.value) : Number(transaction.value);
			return db.query(`
				UPDATE portfolios
				SET 
					cash = cash + ROUND($1, 4),
					buying_power = buying_power + ROUND($1, 4)
				WHERE
					portfolios.id = $2
				RETURNING id;
		`, 
		[cashChange, portfolioId])
		})
		.catch((err: Error) => {
			console.error(`Transaction failed. Transaction with id ${transactionId} not updated in portfolios table. 
			portfolios_stocks id: ${stockPortfolioId}`)
			throw err;
		})

}
export default createTransaction;
