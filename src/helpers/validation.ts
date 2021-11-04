import uniqueCode from '../constants/commonUniqueCodes';
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
			uniqueCode: uniqueCode.noEmailPresent,
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
			uniqueCode: uniqueCode.invalidEmail,
		};
		const errorObject: IResponse = responseHandler(responseObj);
		return errorObject;
	}

	const responseObj: IResponseParams = {
		statusCode: responseCodes.success,
		data: { type: 'success', payload: null },
		functionName: 'validateEmail',
		message: 'Email is valid',
		uniqueCode: uniqueCode.validEmail,
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
			uniqueCode: uniqueCode.noFullNamePresent,
		};
		const errorObject: IResponse = responseHandler(responseObj);
		return errorObject;
	}

	const responseObj: IResponseParams = {
		statusCode: responseCodes.success,
		data: { type: 'success', payload: null },
		functionName: 'validateFullName',
		message: 'Fullname is valid',
		uniqueCode: uniqueCode.validFullName,
	};
	const messageObject: IResponse = responseHandler(responseObj);
	return messageObject;
};

const validateAppName = (contextObject: { name: string }): IResponse => {
	const { name } = contextObject;

	if (!name || !name.trim()) {
		const responseObj: IResponseParams = {
			statusCode: responseCodes.unprocessable,
			data: { type: 'error', payload: null },
			functionName: 'validateAppName',
			message: 'Appname is invalid',
			uniqueCode: uniqueCode.noAppNamePresent,
		};
		const messageObject: IResponse = responseHandler(responseObj);
		return messageObject;
	}

	if (name.length > 16 || name.length < 6) {
		const responseObj: IResponseParams = {
			statusCode: responseCodes.unprocessable,
			data: { type: 'error', payload: null },
			functionName: 'validateAppName',
			message: 'Appname should be between 6 and 16 characters',
			uniqueCode: uniqueCode.invalidAppName,
		};
		const messageObject: IResponse = responseHandler(responseObj);
		return messageObject;
	}

	const responseObj: IResponseParams = {
		statusCode: responseCodes.success,
		data: { type: 'success', payload: null },
		functionName: 'validateAppName',
		message: 'Data is valid',
		uniqueCode: uniqueCode.validAppName,
	};

	const messageObject: IResponse = responseHandler(responseObj);
	return messageObject;
};

const validateAppDescription = (contextObject: {
	description: string;
}): IResponse => {
	const { description } = contextObject;

	if (!description || !description.trim()) {
		const responseObj: IResponseParams = {
			statusCode: responseCodes.unprocessable,
			data: { type: 'error', payload: null },
			functionName: 'validateAppDescription',
			message: 'App description is invalid',
			uniqueCode: uniqueCode.noAppDescriptionPresent,
		};
		const messageObject: IResponse = responseHandler(responseObj);
		return messageObject;
	}

	if (description.length > 120 || description.length < 24) {
		const responseObj: IResponseParams = {
			statusCode: responseCodes.unprocessable,
			data: { type: 'error', payload: null },
			functionName: 'validateAppDescription',
			message: 'App description should be between 24 and 120 characters',
			uniqueCode: uniqueCode.invalidAppDescription,
		};
		const messageObject: IResponse = responseHandler(responseObj);
		return messageObject;
	}

	const responseObj: IResponseParams = {
		statusCode: responseCodes.success,
		data: { type: 'success', payload: null },
		functionName: 'validateAppDescription',
		message: 'Data is valid',
		uniqueCode: uniqueCode.validAppDescription,
	};

	const messageObject: IResponse = responseHandler(responseObj);
	return messageObject;
};

const validateUserId = (contextObject: { userId: string }): IResponse => {
	const { userId } = contextObject;

	if (!userId || !userId.trim()) {
		const responseObj: IResponseParams = {
			statusCode: responseCodes.unauthorized,
			data: { type: 'error', payload: null },
			functionName: 'validateUserId',
			message: 'User ID is not present',
			uniqueCode: uniqueCode.noUserIdPresent,
		};
		const messageObject: IResponse = responseHandler(responseObj);
		return messageObject;
	}

	const responseObj: IResponseParams = {
		statusCode: responseCodes.success,
		data: { type: 'success', payload: null },
		functionName: 'validateUserId',
		message: 'Data is valid',
		uniqueCode: uniqueCode.validUserId,
	};

	const messageObject: IResponse = responseHandler(responseObj);
	return messageObject;
};

export {
	validateEmail,
	validateFullName,
	validateUserId,
	validateAppName,
	validateAppDescription,
};
