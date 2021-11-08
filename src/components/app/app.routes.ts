import { Router } from 'express';
import verifyToken from '../../middlewares/verifyToken';
import { createNewApp, listAllApps, updateAppApiKey } from './app.controllers';

const router: Router = Router();

router.post('/', verifyToken, createNewApp);
router.get('/list', verifyToken, listAllApps);
router.patch('/apikey/:appId', verifyToken, updateAppApiKey);

export default router;
