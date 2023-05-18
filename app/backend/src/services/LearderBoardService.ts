import MatchesModel from '../models/MatchesModel';

export default class LeaderBoardService {
  constructor(private matchesModel = new MatchesModel()) {}

  async getMatchesProgressFalse() {
    const matches = await this.matchesModel.getMatchesForProgress(false);
    return matches;
  }
}
