import { Router } from 'express';
import LeaderBoardController from '../controllers/LearderBoardController';

const leaderBoardRouter = Router();
const leaderBoardController = new LeaderBoardController();

leaderBoardRouter.get('/home', (req, res) => leaderBoardController.getLeaderBoard(req, res));

export default leaderBoardRouter;
