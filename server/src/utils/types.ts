import { Request } from 'express';

export interface IUser {
	id: number | string;
}

export interface IAuthRequest extends Request {
	user?: IUser;
}

export interface ILocation {
	latitude: string;
	longitude: string;
}

export interface IPerformance {
	date_time: Date | string;
	value: number | string;
}

// @TODO: Naming stuff like the below is probably bad practice
export interface IStockInfo {
	stockdata: object;
	name: string;
	stockData: object;
}

// @TODO: Naming stuff like the below is probably bad practice
export interface ICryptoInfo {
	cryptodata: object;
	name: string;
	cryptoData: object;
}

export interface IStock {
	name: string;
	symbol: string;
}

export interface ICrypto {
	name: string;
	symbol: string;
}

export interface IUserStock {
	symbol: string;
	currentValue: number | string;
	stockPerformance: IPerformance[];
}

export interface IAsset {
	symbol: string;
	name: string;
	value: number | string;
	quantity: number;
	type?: string;
}

export interface IQuery {
	query: string;
	params: any[];
}

export interface IPortfolio {
	user_id: number;
	name: string;
	value: string | number;
	cash: string | number;
	buying_power: string | number;
	created_at: string | Date;
	deleted_at?: string | Date;
}

export interface IEnhancedPortfolio {
	name: string;
	value: string | number;
	cash: string | number;
	buying_power: string | number;
	created_at: string | Date;
	deleted_at?: string | Date;
	portfolioHistory?: IPerformance[];
	assets?: IAsset[];
}

export interface IStockTransactionInput {
	stock_id: number | string;
	quantity: number | string;
	type: string;
	value: number | string;
}

export interface ICryptoTransactionInput {
	crypto_id: number | string;
	quantity: number | string;
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
