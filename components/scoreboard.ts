import { Match, Teams } from "../types/common"

interface ScoreboardI {
  activeMatchesCount: number

  addMatch(teams: Teams): string

  finishMatch(teams: Teams): string | null

  updateScore(match: Match): string | null

  getSummary(): string[]
}

class Scoreboard implements ScoreboardI {
  private readonly matches: Match[]

  constructor(matches: Match[]) {
    this.matches = [...matches]
  }

  private formatScore(match: Match) {
    const [[homeTeam, awayTeam], [homeScore, awayScore]] = match
    return `${homeTeam} ${homeScore} - ${awayTeam} ${awayScore}`
  }

  private findMatchIndex(teams: Teams): number | null {
    const [homeTeam, awayTeam] = teams
    const index = this.matches.findIndex(it => (it[0][0] === homeTeam) && (it[0][1] === awayTeam))
    return index >= 0 ? index : null
  }

  public get activeMatchesCount() {
    return this.matches.length
  }

  public addMatch(teams: Teams) {
    this.matches.push([[...teams], [0, 0]])
    return this.formatScore([teams, [0, 0]])
  }

  public finishMatch(teams: Teams): string | null {
    const foundIndex = this.findMatchIndex(teams)

    if (foundIndex) {
      const finishedMatch = this.matches.splice(foundIndex, 1)[0]
      return this.formatScore(finishedMatch)
    } else {
      return null
    }
  }

  public updateScore(match: Match): string | null {
    const [teams] = match
    const foundIndex = this.findMatchIndex(teams)

    if (foundIndex) {
      this.matches[foundIndex] = [...match]
      return this.formatScore(match)
    } else {
      return null
    }
  }

  public getSummary(): string[] {
    return this.matches
      .sort((a, b) => (a[1][0] + a[1][1]) - (b[1][0] + b[1][1]))
      .reverse()
      .map(it => this.formatScore(it))
  }

}

export default Scoreboard
