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
}
