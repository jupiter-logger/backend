const environment: string = process.env.NODE_ENV || 'development';

interface IConfig {
	PORT: number;
	JWT_SECRET: string;
	MONGO_URI: string;
}

const config: IConfig =
	environment === 'development'
		? {
				PORT: 8080,
				JWT_SECRET: 'fhjghldjghjfasdfadskf34343432433432',
				MONGO_URI: 'mongodb://localhost:27017/jupiter',
		  }
		: {
				PORT: 8080,
				JWT_SECRET: process.env.JWT_SECRET || '',
				MONGO_URI: process.env.MONGO_URI || '',
		  };

export default config;
