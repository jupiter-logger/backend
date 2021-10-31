import mongoose from 'mongoose';

export default (db: string) => {
	const connect = () => {
		mongoose
			.connect(db)
			.then(() => console.info(`Successfully connected to ${db}`))
			.catch((error) => {
				console.error('Error connecting to database: ', error);
				throw new Error('Error Connecting to database');
			});
	};
	connect();

	mongoose.connection.on('disconnected', connect);
};
