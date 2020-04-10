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
