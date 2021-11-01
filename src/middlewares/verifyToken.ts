import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { checkIfUserExists } from '../components/user/user.dal';
import config from '../config/config';
import { IResponse } from '../types/IResponse';
import { IResponseParams } from '../types/IResponseParams';
import responseHandler from '../utilities/responseHandler';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
	const { JWT_SECRET }: { JWT_SECRET: string } = config;

	const { authorization } = req.headers;

	if (
		!authorization ||
		!authorization.startsWith('Bearer ') ||
		!authorization.trim()
	) {
		const errorResponse: IResponseParams = {
			statusCode: 'UNAUTHORIZED',
			functionName: 'verifyToken',
			message: 'Unauthorized',
			data: { type: 'error', payload: null },
			uniqueCode: 'verifyToken_err_not_authorized_0',
		};
		const response: IResponse = responseHandler(errorResponse);
		return res.status(response.status).json({ message: response });
	}

	const token = authorization.split(' ')[1];

	jwt.verify(token, JWT_SECRET, async (err, decoded) => {
		if (err) {
			const errorResponse: IResponseParams = {
				statusCode: 'UNAUTHORIZED',
				functionName: 'verifyToken',
				message: 'Unauthorized',
				data: { type: 'error', payload: null },
				uniqueCode: 'verifyToken_err_not_authorized_1',
			};
			const response: IResponse = responseHandler(errorResponse);
			return res.status(response.status).json({ message: response });
		}

		if (!decoded) {
			const errorResponse: IResponseParams = {
				statusCode: 'UNAUTHORIZED',
				functionName: 'verifyToken',
				message: 'Unauthorized',
				data: { type: 'error', payload: null },
				uniqueCode: 'verifyToken_err_not_authorized_2',
			};
			const response: IResponse = responseHandler(errorResponse);
			return res.status(response.status).json({ message: response });
		}

		const userEmail: string = decoded.email;

		const loggedInUser: IResponse = await checkIfUserExists({
			email: userEmail,
		});

		if (loggedInUser.data.type !== 'success') {
			const errorResponse: IResponseParams = {
				statusCode: 'UNAUTHORIZED',
				functionName: 'verifyToken',
				message: 'Unauthorized',
				data: { type: 'error', payload: null },
				uniqueCode: 'verifyToken_err_not_authorized_3',
			};
			const response: IResponse = responseHandler(errorResponse);
			return res.status(response.status).json({ message: response });
		}

		res.locals.user = loggedInUser.data.payload;
		return next();
	});

	const errorResponse: IResponseParams = {
		statusCode: 'UNAUTHORIZED',
		functionName: 'verifyToken',
		message: 'Unauthorized',
		data: { type: 'error', payload: null },
		uniqueCode: 'verifyToken_err_not_authorized_4',
	};
	const response: IResponse = responseHandler(errorResponse);
	return res.status(response.status).json({ message: response });
};

export default verifyToken;
