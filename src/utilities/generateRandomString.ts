import { customAlphabet } from 'nanoid/async';

async function generateRandomString({
	stringType,
}: {
	stringType: string;
}): Promise<string> {
	const alphabet =
		'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

	let lengthOfId: number;

	switch (stringType) {
		case 'API_KEY':
			lengthOfId = 20;
			break;
		default:
			lengthOfId = 12;
			break;
	}

	const nanoid = customAlphabet(alphabet, lengthOfId);
	const id: string = await nanoid();

	return id;
}

export default generateRandomString;
