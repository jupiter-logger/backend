import mongoose, { Schema } from 'mongoose';

const ResponseSchema: Schema = new Schema(
	{
		appId: {
			type: Schema.Types.ObjectId,
			ref: 'App',
			required: true,
		},
		statusCode: {
			type: Number,
			required: true,
		},
		logBody: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Response', ResponseSchema);
