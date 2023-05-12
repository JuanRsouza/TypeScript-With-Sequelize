import { Router } from 'express';
import teamRoute from './teamRoute';
import loginRouter from './loginRoute';

const router = Router();

router.use('/teams', teamRoute);
router.use('/login', loginRouter);

export default router;
