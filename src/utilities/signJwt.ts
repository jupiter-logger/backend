import jwt from 'jsonwebtoken';
import config from '../config/config';

const { JWT_SECRET }: { JWT_SECRET: string } = config;

const signJwt = (payload: { email: string; _id: string }): string => {
	const token = jwt.sign(payload, JWT_SECRET);
	return token;
};

export default signJwt;
