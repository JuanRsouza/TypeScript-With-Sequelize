import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

export default class MatchesModel {
  constructor(private matche = Matches) {}

  async getAllMatches() {
    const matches = await this.matche.findAll({
      include: [
        {
          model: Teams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },

      ],
    });
    return matches;
  }

  async getMatchesForProgress(changeToBoolean: boolean) {
    const matches = await this.matche.findAll({
      include: [
        {
          model: Teams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },

      ],
      where: {
        inProgress: changeToBoolean,
      },
    });
    return matches;
  }

  async finishMatch(id: number) {
    const match = await this.matche.update(
      { inProgress: false },
      { where: { id } },
    );
    return match;
  }
}
