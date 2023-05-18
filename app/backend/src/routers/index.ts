import { Router } from 'express';
import teamRoute from './teamRoute';
import loginRouter from './loginRoute';
import matchesRouter from './matchesRoute';
import leaderBoardRouter from './leaderBoardRouter';

const router = Router();

router.use('/teams', teamRoute);
router.use('/login', loginRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderBoardRouter);

export default router;
