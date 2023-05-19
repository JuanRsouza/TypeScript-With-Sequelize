import { Request, Response } from 'express';
import LeaderBoardService from '../services/LearderBoardService';

export default class LeaderBoardController {
  constructor(private leaderBoardService = new LeaderBoardService()) {}

  async getLeaderBoard(_req: Request, res: Response) {
    const leaderBoard = await this.leaderBoardService.getLeaderBoard();
    return res.status(200).json(leaderBoard);
  }
}
