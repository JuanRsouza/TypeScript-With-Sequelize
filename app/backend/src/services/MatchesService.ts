import MatchesModel from '../models/MatchesModel';

export default class MatchesService {
  constructor(private matchesModel = new MatchesModel()) {}

  async getAllMatches(inProgress: string | undefined) {
    if (inProgress === undefined) {
      const matches = await this.matchesModel.getAllMatches();
      return matches;
    }
    const changeToBoolean = inProgress === 'true';
    const matches = await this.matchesModel.getMatchesForProgress(changeToBoolean);
    return matches;
  }

  async finishMatch(id: number) {
    const match = await this.matchesModel.finishMatch(id);
    return match;
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const match = await this.matchesModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return match;
  }
}
