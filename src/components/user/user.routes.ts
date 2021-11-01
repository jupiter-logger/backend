import { Router } from 'express';
import { loginUser } from './user.controllers';

const router: Router = Router();

router.post('/login', loginUser);

export default router;
