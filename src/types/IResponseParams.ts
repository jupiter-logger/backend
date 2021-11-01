export interface IResponseParams {
	statusCode: string;
	functionName: string | null;
	message: string | null;
	data: object | null;
	uniqueCode: string;
}
