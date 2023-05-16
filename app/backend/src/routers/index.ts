import { Router } from 'express';
import teamRoute from './teamRoute';
import loginRouter from './loginRoute';
import matchesRouter from './matchesRoute';

const router = Router();

router.use('/teams', teamRoute);
router.use('/login', loginRouter);
router.use('/matches', matchesRouter);

export default router;
