export class LeagueMatchEntity {
    id: string;
    groupId: number;
    matchDate: number;
    stadium: string;
    homeTeam: string;
    awayTeam: string;
    matchPlayed: boolean;
    homeTeamScore: number;
    awayTeamScore: number;
}
