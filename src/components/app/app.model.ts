import mongoose, { Schema } from 'mongoose';

const AppSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		apiKey: {
			type: String,
			required: true,
			unique: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('App', AppSchema);
