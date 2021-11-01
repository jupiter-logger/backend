import User from './user.model';
import responseHandler from '../../utilities/responseHandler';
import { IResponse } from '../../types/IResponse';
import { IResponseParams } from '../../types/IResponseParams';
import { validateEmail, validateFullName } from '../../helpers/validation';
import signJwt from '../../utilities/signJwt';

const checkIfUserExists = async (contextObject: {
	email: string;
}): Promise<IResponse> => {
	const { email } = contextObject;

	const emailValidationResult: IResponse = validateEmail({ email });
	if (emailValidationResult.data.type === 'error') return emailValidationResult;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			const responseObj: IResponseParams = {
				statusCode: 'NOT_FOUND',
				data: { type: 'message', payload: null },
				functionName: 'checkIfUserExists',
				message: 'User is not present',
				uniqueCode: 'user_not_present',
			};
			const messageObject: IResponse = responseHandler(responseObj);
			return messageObject;
		}

		const signJwtResponse: string = signJwt({ email, _id: user._id });
		const responseObj: IResponseParams = {
			statusCode: 'SUCCESS',
			data: { type: 'message', payload: { ...user, token: signJwtResponse } },
			functionName: 'checkIfUserExists',
			message: 'User already exists',
			uniqueCode: 'user_present',
		};
		const messageObject: IResponse = responseHandler(responseObj);
		return messageObject;
	} catch (err: unknown) {
		const responseObj: IResponseParams = {
			statusCode: 'INTERNAL_SERVER_ERROR',
			data: { type: 'error', payload: err },
			functionName: 'checkIfUserExists',
			message: null,
			uniqueCode: 'checkIfUserExists_internal_server_error',
		};
		const errorObject: IResponse = responseHandler(responseObj);
		return errorObject;
	}
};

const createUser = async (contextObject: {
	email: string;
	fullName: string;
}): Promise<IResponse> => {
	const { email, fullName } = contextObject;

	const emailValidationResult: IResponse = validateEmail({ email });
	if (emailValidationResult.data.type === 'error') return emailValidationResult;

	const fullNameValidationResult: IResponse = validateFullName({ fullName });
	if (fullNameValidationResult.data.type === 'error')
		return fullNameValidationResult;

	try {
		const isUserPresent: IResponse = await checkIfUserExists({ email });
		if (isUserPresent.uniqueCode !== 'user_not_present') return isUserPresent;

		const user = await User.create({ email, fullName });
		if (!user) {
			const responseObj: IResponseParams = {
				statusCode: 'INTERNAL_SERVER_ERROR',
				data: { type: 'error', payload: null },
				functionName: 'createUser',
				message: 'user not created due to some mongo error',
				uniqueCode: 'createUser_internal_server_error_0',
			};
			const errorObject: IResponse = responseHandler(responseObj);
			return errorObject;
		}

		const signJwtResponse: string = signJwt({ email, _id: user._id });

		const responseObj: IResponseParams = {
			statusCode: 'CREATED',
			data: { type: 'success', payload: { ...user, token: signJwtResponse } },
			functionName: 'createUser',
			message: 'User created successfully',
			uniqueCode: 'user_created',
		};
		const messageObject: IResponse = responseHandler(responseObj);
		return messageObject;
	} catch (err: unknown) {
		const responseObj: IResponseParams = {
			statusCode: 'INTERNAL_SERVER_ERROR',
			data: { type: 'error', payload: err },
			functionName: 'createUser',
			message: null,
			uniqueCode: 'createUser_internal_server_error_1',
		};
		const errorObject: IResponse = responseHandler(responseObj);
		return errorObject;
	}
};

export { checkIfUserExists, createUser };
