import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import verifyToken from '../middlewares/verifyToken';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.get('/', (req, res) => matchesController.getAllMatches(req, res));
matchesRouter
  .patch('/:id/finish', verifyToken, (req, res) => matchesController.finishMatch(req, res));

export default matchesRouter;
