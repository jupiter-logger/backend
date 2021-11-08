import { Request, Response } from 'express';
import { IResponse } from '../../types/IResponse';
import { createApp, listApps, updateApiKey } from './app.dal';

const createNewApp = async (req: Request, res: Response) => {
	const { loggedUser } = res.locals;
	const userId: string = loggedUser.user._id.toString();

	const { name, description }: { name: string; description: string } = req.body;

	const createAppResponse: IResponse = await createApp({
		name,
		description,
		userId,
	});
	return res
		.status(createAppResponse.status)
		.json({ response: createAppResponse });
};

const listAllApps = async (req: Request, res: Response) => {
	const { loggedUser } = res.locals;
	const userId: string = loggedUser.user._id.toString();

	const listAppResponse: IResponse = await listApps({
		userId,
	});
	return res.status(listAppResponse.status).json({ response: listAppResponse });
};

const updateAppApiKey = async (req: Request, res: Response) => {
	const { loggedUser } = res.locals;
	const userId: string = loggedUser.user._id.toString();

	const { appId } = req.params;

	const updateApiKeyResponse: IResponse = await updateApiKey({
		appId,
		userId,
	});
	return res
		.status(updateApiKeyResponse.status)
		.json({ response: updateApiKeyResponse });
};

export { createNewApp, listAllApps, updateAppApiKey };
