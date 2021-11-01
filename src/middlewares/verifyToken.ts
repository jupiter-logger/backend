import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { checkIfUserExists } from '../components/user/user.dal';
import config from '../config/config';
import responseCodes from '../constants/responseCodes';
import { IResponse } from '../types/IResponse';
import { IResponseParams } from '../types/IResponseParams';
import responseHandler from '../utilities/responseHandler';

const unauthorizedMessage = (count: number): IResponseParams => {
	const errorResponse: IResponseParams = {
		statusCode: responseCodes.unauthorized,
		functionName: 'verifyToken',
		message: 'Unauthorized',
		data: { type: 'error', payload: null },
		uniqueCode: `verifyToken_err_not_authorized_${count}`,
	};
	return errorResponse;
};

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
	const { JWT_SECRET }: { JWT_SECRET: string } = config;

	const { authorization } = req.headers;

	if (
		!authorization ||
		!authorization.startsWith('Bearer ') ||
		!authorization.trim()
	) {
		const errorResponse: IResponseParams = unauthorizedMessage(0);
		const response: IResponse = responseHandler(errorResponse);
		return res.status(response.status).json({ message: response });
	}

	const token = authorization.split(' ')[1];

	jwt.verify(token, JWT_SECRET, async (err, decoded) => {
		if (err) {
			const errorResponse: IResponseParams = unauthorizedMessage(1);
			const response: IResponse = responseHandler(errorResponse);
			return res.status(response.status).json({ message: response });
		}

		if (!decoded) {
			const errorResponse: IResponseParams = unauthorizedMessage(2);
			const response: IResponse = responseHandler(errorResponse);
			return res.status(response.status).json({ message: response });
		}

		const userEmail: string = decoded.email;

		const loggedInUser: IResponse = await checkIfUserExists({
			email: userEmail,
		});

		if (loggedInUser.data.type !== 'success') {
			const errorResponse: IResponseParams = unauthorizedMessage(3);
			const response: IResponse = responseHandler(errorResponse);
			return res.status(response.status).json({ message: response });
		}

		res.locals.user = loggedInUser;
		return next();
	});

	const errorResponse: IResponseParams = unauthorizedMessage(4);
	const response: IResponse = responseHandler(errorResponse);
	return res.status(response.status).json({ message: response });
};

export default verifyToken;
