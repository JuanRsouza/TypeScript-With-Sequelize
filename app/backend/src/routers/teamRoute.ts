import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamRouter = Router();
const teamController = new TeamController();

teamRouter.get('/', (req, res) => teamController.getAllTeams(req, res));

export default teamRouter;
