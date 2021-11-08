import uniqueCode from '../../constants/commonUniqueCodes';
import responseCodes from '../../constants/responseCodes';
import {
	validateAppName,
	validateAppDescription,
	validateUserId,
	validateAppId,
} from '../../helpers/validation';
import { IResponse } from '../../types/IResponse';
import { IResponseParams } from '../../types/IResponseParams';
import generateRandomString from '../../utilities/generateRandomString';
import responseHandler from '../../utilities/responseHandler';
import App from './app.model';

const createApp = async (contextObject: {
	name: string;
	description: string;
	userId: string;
}): Promise<IResponse> => {
	const { name, description, userId } = contextObject;

	const appNameValidationResponse: IResponse = validateAppName({
		name,
	});

	if (appNameValidationResponse.data.type === 'error')
		return new Promise((resolve) => resolve(appNameValidationResponse));

	const appDescriptionValidationResponse: IResponse = validateAppDescription({
		description,
	});

	if (appDescriptionValidationResponse.data.type === 'error')
		return new Promise((resolve) => resolve(appDescriptionValidationResponse));

	const userIdValidationResponse: IResponse = validateUserId({
		userId,
	});

	if (userIdValidationResponse.data.type === 'error')
		return new Promise((resolve) => resolve(userIdValidationResponse));

	const apiKey = await generateRandomString({ stringType: 'API_KEY' });

	try {
		const app = await App.create({ name, description, userId, apiKey });
		if (!app) {
			const responseObj: IResponseParams = {
				statusCode: responseCodes.internalServerError,
				data: { type: 'error', payload: null },
				functionName: 'createApp',
				message: 'app not created due to some mongo error',
				uniqueCode: uniqueCode.internalServerError,
			};
			const errorObject: IResponse = responseHandler(responseObj);
			return errorObject;
		}

		const responseObj: IResponseParams = {
			statusCode: responseCodes.created,
			data: { type: 'success', payload: app },
			functionName: 'createApp',
			message: 'App created successfully',
			uniqueCode: uniqueCode.appCreated,
		};
		const messageObject: IResponse = responseHandler(responseObj);
		return messageObject;
	} catch (err: unknown) {
		const responseObj: IResponseParams = {
			statusCode: responseCodes.internalServerError,
			data: { type: 'error', payload: err },
			functionName: 'createApp',
			message: null,
			uniqueCode: uniqueCode.internalServerError,
		};
		const errorObject: IResponse = responseHandler(responseObj);
		return errorObject;
	}
};

const listApps = async (contextObject: {
	userId: string;
}): Promise<IResponse> => {
	const { userId } = contextObject;

	const userIdValidationResponse: IResponse = validateUserId({
		userId,
	});

	if (userIdValidationResponse.data.type === 'error')
		return new Promise((resolve) => resolve(userIdValidationResponse));

	try {
		const apps = await App.find({ userId })
			.select('-apiKey')
			.sort({ createdAt: -1 });
		if (!apps) {
			const responseObj: IResponseParams = {
				statusCode: responseCodes.internalServerError,
				data: { type: 'error', payload: null },
				functionName: 'listApps',
				message: 'app not found due to some mongo error',
				uniqueCode: uniqueCode.internalServerError,
			};
			const errorObject: IResponse = responseHandler(responseObj);
			return errorObject;
		}

		if (apps.length === 0) {
			const responseObj: IResponseParams = {
				statusCode: responseCodes.notFound,
				data: { type: 'error', payload: null },
				functionName: 'listApps',
				message: 'No apps created by user',
				uniqueCode: uniqueCode.noAppsRegistered,
			};
			const errorObject: IResponse = responseHandler(responseObj);
			return errorObject;
		}

		const responseObj: IResponseParams = {
			statusCode: responseCodes.success,
			data: { type: 'success', payload: apps },
			functionName: 'listApps',
			message: 'Apps listed successfully',
			uniqueCode: uniqueCode.appsFetched,
		};
		const messageObject: IResponse = responseHandler(responseObj);
		return messageObject;
	} catch (err: unknown) {
		const responseObj: IResponseParams = {
			statusCode: responseCodes.internalServerError,
			data: { type: 'error', payload: err },
			functionName: 'listApps',
			message: null,
			uniqueCode: uniqueCode.internalServerError,
		};
		const errorObject: IResponse = responseHandler(responseObj);
		return errorObject;
	}
};

const updateApiKey = async (contextObject: {
	appId: string;
	userId: string;
}): Promise<IResponse> => {
	const { appId, userId } = contextObject;

	const appIdValidationResponse: IResponse = validateAppId({
		appId,
	});

	if (appIdValidationResponse.data.type === 'error')
		return new Promise((resolve) => resolve(appIdValidationResponse));

	const userIdValidationResponse: IResponse = validateUserId({
		userId,
	});

	if (userIdValidationResponse.data.type === 'error')
		return new Promise((resolve) => resolve(userIdValidationResponse));

	const apiKey = await generateRandomString({ stringType: 'API_KEY' });
	try {
		const app = await App.findOneAndUpdate(
			{ _id: appId, userId },
			{ apiKey },
			{ new: true }
		);
		if (!app) {
			const responseObj: IResponseParams = {
				statusCode: responseCodes.notFound,
				data: { type: 'error', payload: null },
				functionName: 'updateApiKey',
				message: 'app not found',
				uniqueCode: uniqueCode.nonExistingApp,
			};
			const errorObject: IResponse = responseHandler(responseObj);
			return errorObject;
		}

		const responseObj: IResponseParams = {
			statusCode: responseCodes.success,
			data: { type: 'success', payload: app },
			functionName: 'updateApiKey',
			message: 'Api key updated successfully',
			uniqueCode: uniqueCode.apiKeyUpdated,
		};
		const messageObject: IResponse = responseHandler(responseObj);
		return messageObject;
	} catch (err) {
		const responseObj: IResponseParams = {
			statusCode: responseCodes.internalServerError,
			data: { type: 'error', payload: err },
			functionName: 'updateApiKey',
			message: null,
			uniqueCode: uniqueCode.internalServerError,
		};
		const errorObject: IResponse = responseHandler(responseObj);
		return errorObject;
	}
};

export { createApp, listApps, updateApiKey };
