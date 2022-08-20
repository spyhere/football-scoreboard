export type Teams = [string, string]
export type Score = [number, number]
export type Match = [Teams, Score]


interface ScoreboardI {
  activeMatchesCount: number

  addMatch(newMatch: Teams): string
  finishMatch(teams: Teams): string|null
  updateScore(match: Match): string|null
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

  private findMatchIndex(teams: Teams): number|null {
    const [homeTeam, awayTeam] = teams
    const index = this.matches.findIndex(it => (it[0][0] === homeTeam) && (it[0][1] === awayTeam))
    return index >= 0 ? index : null
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

  public updateScore(match: Match): string|null {
    const [teams] = match
    const foundIndex = this.findMatchIndex(teams)

    if (foundIndex) {
      this.matches[foundIndex] = match
      return this.formatScore(match)
    } else {
      return null
    }
  }

}

export default Scoreboard
