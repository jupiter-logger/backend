import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { checkIfUserExists } from '../components/user/user.dal';
import config from '../config/config';
import uniqueCode from '../constants/commonUniqueCodes';
import responseCodes from '../constants/responseCodes';
import { IResponse } from '../types/IResponse';
import { IResponseParams } from '../types/IResponseParams';
import responseHandler from '../utilities/responseHandler';

const unauthorizedMessage = (): IResponseParams => {
	const errorResponse: IResponseParams = {
		statusCode: responseCodes.unauthorized,
		functionName: 'verifyToken',
		message: 'Unauthorized',
		data: { type: 'error', payload: null },
		uniqueCode: uniqueCode.unauthorizedRequest,
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
		const errorResponse: IResponseParams = unauthorizedMessage();
		const response: IResponse = responseHandler(errorResponse);
		return res.status(response.status).json({ response });
	}

	const token = authorization.split(' ')[1];

	return jwt.verify(token, JWT_SECRET, async (err, decoded) => {
		if (err) {
			const errorResponse: IResponseParams = unauthorizedMessage();
			const response: IResponse = responseHandler(errorResponse);
			return res.status(response.status).json({ response });
		}

		if (!decoded) {
			const errorResponse: IResponseParams = unauthorizedMessage();
			const response: IResponse = responseHandler(errorResponse);
			return res.status(response.status).json({ response });
		}

		const userEmail: string = decoded.email;

		const loggedInUser: IResponse = await checkIfUserExists({
			email: userEmail,
		});

		if (loggedInUser.data.type !== 'success') {
			const errorResponse: IResponseParams = unauthorizedMessage();
			const response: IResponse = responseHandler(errorResponse);
			return res.status(response.status).json({ response });
		}

		res.locals.user = loggedInUser.data.payload;

		return next();
	});
};

export default verifyToken;
