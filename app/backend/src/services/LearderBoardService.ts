import MatchesModel from '../models/MatchesModel';

type IMatche = {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam: ITeam;
  awayTeam: ITeam;
};

type ITeam = {
  teamName: string;
};

type IInfoTeam = {
  goalsFavor: number,
  goalsOwn: number,
  totalVictories: number,
  totalDraws: number,
};

export default class LeaderBoardService {
  constructor(private matchesModel = new MatchesModel()) {}

  async getMatchesProgressFalse() {
    const matches = await this.matchesModel.getMatchesForProgress(false);
    return matches as unknown as IMatche[];
  }

  async filterTeams() {
    const allMatches = await this.getMatchesProgressFalse();
    const teamNameAndId = allMatches.reduce((acc, match) => {
      if (!acc.find((team) => team.name === match.homeTeam.teamName)) {
        return [
          ...acc,
          { name: match.homeTeam.teamName,
            id: match.homeTeamId,
          },
        ];
      }
      return acc;
    }, [] as { name: string, id: number }[]);
    return { allMatches, teamNameAndId };
  }

  static dependecie(matchesPerTeam: IMatche[]) {
    const dpd2 = LeaderBoardService.dependencie2(matchesPerTeam);
    const dpd3 = LeaderBoardService.dependencie3(matchesPerTeam, dpd2);
    return { ...dpd2, ...dpd3 };
  }

  static dependencie2(matchesPerTeam: IMatche[]) {
    const goalsFavor = matchesPerTeam.reduce((a, b) => a + b.homeTeamGoals, 0);
    const goalsOwn = matchesPerTeam.reduce((a, b) => a + b.awayTeamGoals, 0);

    const totalVictories = matchesPerTeam
      .filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;

    const totalDraws = matchesPerTeam
      .filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;

    const totalLosses = matchesPerTeam
      .filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;

    return {
      goalsFavor,
      goalsOwn,
      totalVictories,
      totalDraws,
      totalLosses,
    };
  }

  static dependencie3(
    matchesPerTeam: IMatche[],
    teamInfo: IInfoTeam,
  ) {
    const totalPoints = (teamInfo.totalVictories * 3) + teamInfo.totalDraws;

    const goalsBalance = teamInfo.goalsFavor - teamInfo.goalsOwn;

    const efficiency = Number(((totalPoints / (matchesPerTeam.length * 3)) * 100).toFixed(2));

    return {
      totalPoints,
      goalsBalance,
      efficiency,
    };
  }

  async getLeaderBoard() {
    const { allMatches, teamNameAndId } = await this.filterTeams();
    const performanceTeams = teamNameAndId.map((team) => {
      const matchesPerTeam = allMatches.filter((match) => match.homeTeamId === team.id);
      const teamInfo = LeaderBoardService.dependecie(matchesPerTeam);

      return {
        name: team.name,
        totalGames: matchesPerTeam.length,
        goalsFavor: teamInfo.goalsFavor,
        goalsOwn: teamInfo.goalsOwn,
        totalVictories: teamInfo.totalVictories,
        totalDraws: teamInfo.totalDraws,
        totalLosses: teamInfo.totalLosses,
        totalPoints: teamInfo.totalPoints,
        goalsBalance: teamInfo.goalsBalance,
        efficiency: teamInfo.efficiency,
      };
    });
    return performanceTeams;
  }

  async sortLeaderBoard() {
    const performanceTeams = await this.getLeaderBoard();
    const sortedLeaderBoard = performanceTeams.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      return 0;
    });
    return sortedLeaderBoard;
  }
}
