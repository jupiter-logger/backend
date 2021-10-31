import jwt from 'jsonwebtoken';
import config from '../config/config';

const { JWT_SECRET }: { JWT_SECRET: string } = config;

const signJwt = (id: string): string => {
	const token = jwt.sign({ id }, JWT_SECRET);
	return token;
};

export default signJwt;
