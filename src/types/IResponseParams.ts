export interface IResponseParams {
	statusCode: string;
	functionName: string | null;
	message: string | null;
	data: { type: string; payload: unknown };
	uniqueCode: string;
}
