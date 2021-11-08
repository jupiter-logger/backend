import { Request, Response } from 'express';
import { IResponse } from '../../types/IResponse';
import { createUser, getLoggedinUser } from './user.dal';

const loginUser = async (req: Request, res: Response) => {
	const { email, fullName }: { email: string; fullName: string } = req.body;

	const loginUserResponse: IResponse = await createUser({ email, fullName }); // createUser will also handle request for preexisting user

	return res
		.status(loginUserResponse.status)
		.json({ response: loginUserResponse });
};

const getUser = async (req: Request, res: Response) => {
	const { loggedUser } = res.locals;

	const getUserResponse: IResponse = await getLoggedinUser({
		user: loggedUser,
	});

	return res.status(getUserResponse.status).json({ response: getUserResponse });
};

export { loginUser, getUser };
