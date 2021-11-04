import { Request, Response, NextFunction } from 'express';
import configSettings from '../config/config';
import uniqueCode from '../constants/commonUniqueCodes';
import responseCodes from '../constants/responseCodes';
import { IResponse } from '../types/IResponse';
import responseHandler from '../utilities/responseHandler';

const whitelistOrigin: string =
	configSettings.ENVIRONMENT === 'development'
		? 'localhost'
		: 'jupiter-logger.com';

const errorObject = (): IResponse =>
	responseHandler({
		statusCode: responseCodes.unauthorized,
		data: { type: 'error', payload: null },
		functionName: null,
		message: 'Not Authorized to access this route',
		uniqueCode: uniqueCode.unauthorizedOrigin,
	});

const checkOrigin = (req: Request, res: Response, next: NextFunction) => {
	if (!req.headers.origin) {
		const errorObj: IResponse = errorObject();
		return res.status(errorObj.status).json({ response: errorObj });
	}
	const { origin } = req.headers;
	if (origin.includes(whitelistOrigin)) {
		return next();
	}
	const errorObj: IResponse = errorObject();
	return res.status(errorObj.status).json({ response: errorObj });
};

export default checkOrigin;
