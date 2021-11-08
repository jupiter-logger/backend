import User from './user.model';
import responseHandler from '../../utilities/responseHandler';
import { IResponse } from '../../types/IResponse';
import { IResponseParams } from '../../types/IResponseParams';
import { validateEmail, validateFullName } from '../../helpers/validation';
import signJwt from '../../utilities/signJwt';
import responseCodes from '../../constants/responseCodes';
import uniqueCode from '../../constants/commonUniqueCodes';

const checkIfUserExists = async (contextObject: {
	email: string;
}): Promise<IResponse> => {
	const { email } = contextObject;

	const emailValidationResult: IResponse = validateEmail({ email });
	if (emailValidationResult.data.type === 'error')
		return new Promise((resolve) => resolve(emailValidationResult));

	try {
		const user = await User.findOne({ email });
		if (!user) {
			const responseObj: IResponseParams = {
				statusCode: responseCodes.notFound,
				data: { type: 'error', payload: null },
				functionName: 'checkIfUserExists',
				message: 'User is not present',
				uniqueCode: uniqueCode.nonExistingUser,
			};
			const messageObject: IResponse = responseHandler(responseObj);
			return messageObject;
		}

		const signJwtResponse: string = signJwt({ email, _id: user._id });
		const responseObj: IResponseParams = {
			statusCode: responseCodes.success,
			data: { type: 'success', payload: { user, token: signJwtResponse } },
			functionName: 'checkIfUserExists',
			message: 'User already exists',
			uniqueCode: uniqueCode.userExists,
		};
		const messageObject: IResponse = responseHandler(responseObj);
		return messageObject;
	} catch (err: unknown) {
		const responseObj: IResponseParams = {
			statusCode: responseCodes.internalServerError,
			data: { type: 'error', payload: err },
			functionName: 'checkIfUserExists',
			message: null,
			uniqueCode: uniqueCode.internalServerError,
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
	if (emailValidationResult.data.type === 'error')
		return new Promise((resolve) => resolve(emailValidationResult));

	const fullNameValidationResult: IResponse = validateFullName({ fullName });
	if (fullNameValidationResult.data.type === 'error')
		return new Promise((resolve) => resolve(fullNameValidationResult));

	try {
		const isUserPresent: IResponse = await checkIfUserExists({ email });
		if (isUserPresent.uniqueCode !== uniqueCode.nonExistingUser)
			return isUserPresent;

		const saveNewUser = new User({ email, fullName });
		const user = await saveNewUser.save();

		if (!user) {
			const responseObj: IResponseParams = {
				statusCode: responseCodes.internalServerError,
				data: { type: 'error', payload: null },
				functionName: 'createUser',
				message: 'user not created due to some mongo error',
				uniqueCode: uniqueCode.internalServerError,
			};
			const errorObject: IResponse = responseHandler(responseObj);
			return errorObject;
		}

		const signJwtResponse: string = signJwt({ email, _id: user._id });

		const responseObj: IResponseParams = {
			statusCode: responseCodes.created,
			data: { type: 'success', payload: { user, token: signJwtResponse } },
			functionName: 'createUser',
			message: 'User created successfully',
			uniqueCode: uniqueCode.userCreated,
		};
		const messageObject: IResponse = responseHandler(responseObj);
		return messageObject;
	} catch (err: unknown) {
		const responseObj: IResponseParams = {
			statusCode: responseCodes.internalServerError,
			data: { type: 'error', payload: err },
			functionName: 'createUser',
			message: null,
			uniqueCode: uniqueCode.internalServerError,
		};
		const errorObject: IResponse = responseHandler(responseObj);
		return errorObject;
	}
};

const getLoggedinUser = async (contextObject: {
	user: object;
}): Promise<IResponse> => {
	const { user } = contextObject;

	const responseObj: IResponseParams = {
		statusCode: responseCodes.success,
		data: { type: 'success', payload: user },
		functionName: 'getLoggedinUser',
		message: 'User fetched successfully',
		uniqueCode: uniqueCode.userFetched,
	};
	const messageObject: IResponse = responseHandler(responseObj);
	return new Promise((resolve) => resolve(messageObject));
};

export { checkIfUserExists, createUser, getLoggedinUser };
