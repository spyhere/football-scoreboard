export type Teams = [string, string]
export type Score = [number, number]
export type Match = [Teams, Score]


interface ScoreboardI {
  activeMatchesCount: number

  addMatch(newMatch: Teams)
  finishMatch(teams: Teams): string|null
}

class Scoreboard implements ScoreboardI {
  private matches: Match[]

  constructor(matches: Match[]) {
    this.matches = [...matches]
  }

  private formatScore(match: Match) {
    const [[homeTeam, awayTeam], [homeScore, awayScore]] = match
    return `${homeTeam} ${homeScore} - ${awayTeam} ${awayScore}`
  }

  public get activeMatchesCount() {
    return this.matches.length
  }

  public addMatch(newMatch: Teams) {
    this.matches.push([newMatch, [0, 0]])
    return this.formatScore([newMatch, [0, 0]])
  }

  public finishMatch(teams: Teams): string|null {
    const [homeTeam, awayTeam] = teams
    const existingMatch = this.matches.findIndex(it => (it[0][0] === homeTeam) && (it[0][1] === awayTeam))

    if (existingMatch >= 0) {
      const finishedMatch = this.matches.splice(existingMatch, 1)[0]
      return this.formatScore(finishedMatch)
    } else {
      return null
    }
  }

}

export default Scoreboard
