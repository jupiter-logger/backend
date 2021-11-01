import { Request, Response } from 'express';
import { IResponse } from '../../types/IResponse';
import { createUser } from './user.dal';

const loginUser = async (req: Request, res: Response) => {
	const { email, fullName }: { email: string; fullName: string } = req.body;

	const loginUserResponse: IResponse = await createUser({ email, fullName });

	return res
		.status(loginUserResponse.status)
		.json({ message: loginUserResponse });
};

// eslint-disable-next-line import/prefer-default-export
export { loginUser };
