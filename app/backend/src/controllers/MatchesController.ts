import { Request, Response } from 'express';
import IRequestUser from '../utils/IRequestUser';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matches = await this.matchesService
      .getAllMatches(inProgress as string | undefined);
    return res.status(200).json(matches);
  }

  async finishMatch(req: IRequestUser, res: Response) {
    const { id } = req.params;
    await this.matchesService.finishMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }
}