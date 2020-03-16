import { Request } from 'express';

export interface IUser {
	id: number | string;
}

export interface IAuthRequest extends Request {
	user?: IUser;
}
