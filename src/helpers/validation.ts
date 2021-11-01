import responseCodes from '../constants/responseCodes';
import { IResponse } from '../types/IResponse';
import { IResponseParams } from '../types/IResponseParams';
import responseHandler from '../utilities/responseHandler';

const validateEmail = (contextObject: { email: string }): IResponse => {
	const { email } = contextObject;

	if (!email || !email.trim()) {
		const responseObj: IResponseParams = {
			statusCode: responseCodes.unprocessable,
			data: { type: 'error', payload: null },
			functionName: 'validateEmail',
			message: 'Email is not present',
			uniqueCode: 'email_not_present',
		};
		const errorObject: IResponse = responseHandler(responseObj);
		return errorObject;
	}

	const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

	if (!emailRegex.test(email)) {
		const responseObj: IResponseParams = {
			statusCode: responseCodes.unprocessable,
			data: { type: 'error', payload: null },
			functionName: 'validateEmail',
			message: 'Email is invalid',
			uniqueCode: 'invalid_email',
		};
		const errorObject: IResponse = responseHandler(responseObj);
		return errorObject;
	}

	const responseObj: IResponseParams = {
		statusCode: responseCodes.success,
		data: { type: 'success', payload: null },
		functionName: 'validateEmail',
		message: 'Email is valid',
		uniqueCode: 'valid_email',
	};
	const messageObject: IResponse = responseHandler(responseObj);
	return messageObject;
};

const validateFullName = (contextObject: { fullName: string }): IResponse => {
	const { fullName } = contextObject;

	if (!fullName || !fullName.trim()) {
		const responseObj: IResponseParams = {
			statusCode: responseCodes.unprocessable,
			data: { type: 'error', payload: null },
			functionName: 'validateFullName',
			message: 'Fullname is not present',
			uniqueCode: 'fullname_not_present',
		};
		const errorObject: IResponse = responseHandler(responseObj);
		return errorObject;
	}

	const fullNameRegex = /^[\\p{L} .'-]+$/;

	if (!fullNameRegex.test(fullName)) {
		const responseObj: IResponseParams = {
			statusCode: responseCodes.unprocessable,
			data: { type: 'error', payload: null },
			functionName: 'validateFullName',
			message: 'Fullname is invalid',
			uniqueCode: 'invalid_fullname',
		};
		const errorObject: IResponse = responseHandler(responseObj);
		return errorObject;
	}

	const responseObj: IResponseParams = {
		statusCode: responseCodes.success,
		data: { type: 'success', payload: null },
		functionName: 'validateFullName',
		message: 'Fullname is valid',
		uniqueCode: 'valid_fullname',
	};
	const messageObject: IResponse = responseHandler(responseObj);
	return messageObject;
};

export { validateEmail, validateFullName };
