import { Request, Response, NextFunction, RequestHandler } from 'express';

export interface IUser {
	id: number | string;
}

export interface IAuthRequest extends Request {
	user?: IUser;
}

export interface IMiddleware extends RequestHandler {
	<T>(req: Request & T, res: Response, next: NextFunction): void;
}
