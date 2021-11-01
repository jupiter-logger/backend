import { Router } from 'express';
import verifyToken from '../../middlewares/verifyToken';
import { getUser, loginUser } from './user.controllers';

const router: Router = Router();

router.post('/login', loginUser);
router.get('/', verifyToken, getUser);

export default router;
