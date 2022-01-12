import jwt from 'jsonwebtoken';
import { config } from '../config';

const generateJWT = (uid = '') => {
	return new Promise((resolve, reject) => {
		const payload = { uid };

		jwt.sign(
			payload,
			config.jwt.key,
			{
				expiresIn: '4h',
			},
			(error, token) => {
				if (error) {
					console.log(error);
					reject('The token could not be generated');
				} else {
					resolve(token);
				}
			},
		);
	});
};

export default generateJWT;
