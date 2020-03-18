import { Request } from 'express';

export interface IUser {
	id: number | string;
}

export interface IAuthRequest extends Request {
	user?: IUser;
}

export interface IPerformance {
	date_time: Date | string;
	value: number | string;
}

export interface IstockInfo {
	stockdata: object,
	name: string,
	stockData: object
}

export interface IUserStock {
	symbol: string;
	currentValue: number | string;
	stockPerformance: IPerformance[];
}

export interface IPortfolio {
	user_id?: number;
	name: string;
	value: string | number;
	cash: string | number;
	buying_power?: string | number;
	created_at?: string | Date;
	deleted_at?: string | Date;
	portfolioPerformance?: IPerformance[];
	userStocks?: IUserStock[];
}

export interface IStockTransactionInput {
	portfolio_id: number | string;
	stock_id: number | string;
	quantity: number | string;
	date_time: Date | string;
	type: string;
	value: number | string;
}

export interface IStockTransactionOutput {
	id: number | string;
	portfolio_id: number | string;
	stock_id: number | string;
	quantity: number | string;
	date_time: Date | string;
	type: string;
	value: number | string;
}
