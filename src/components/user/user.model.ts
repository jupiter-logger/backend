import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		fullName: {
			type: String,
			required: true,
		},
		apps: [
			{
				type: Schema.Types.ObjectId,
				ref: 'App',
			},
		],
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('User', UserSchema);
