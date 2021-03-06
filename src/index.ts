import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import logger from 'morgan';
import helmet from 'helmet';
import { config } from 'dotenv';
import configSettings from './config/config';
import db from './config/dbConfig';
import checkOrigin from './middlewares/checkRequestOrigin';
import userRoutes from './components/user/user.routes';
import appRoutes from './components/app/app.routes';

config();

const app: Application = express();

/*
 * @middlewares
 */

app.use(cors());
app.use(helmet());
app.use(express.json());
app.enable('trust proxy'); // To log IP Address of the requests
app.use(
	logger(
		':date[iso] :remote-addr :method :url :status :res[content-length] - :response-time ms'
	)
);

db(configSettings.MONGO_URI);

/*
 * @routes
 */

app.get('/', (req: Request, res: Response) =>
	res.json('Hello there you user!!')
);

app.use('/api/v1/user', [checkOrigin], userRoutes);
app.use('/api/v1/app', [checkOrigin], appRoutes);

/*
 * @additionalConfig
 */

const { PORT }: { PORT: number } = configSettings;
app.listen(PORT, () => console.log(`server is running ${PORT}`));
