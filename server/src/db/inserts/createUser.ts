import { ILocation } from '../../utils/types';
import db from '../index';

const createUser = (
	name: string,
	email: string,
	hash: string,
	avatar: string,
	location: ILocation = { latitude: '48.428', longitude: '-123.365' }
) =>
	db
		.query(
			`
			INSERT INTO users(name, email, password_hash, avatar, latitude, longitude)
			VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
			`,
			[name, email, hash, avatar, location.latitude, location.longitude]
		)
		.then((userArray: object[]) => userArray[0])
		.catch((err: Error) => {
			throw err;
		});

export default createUser;
