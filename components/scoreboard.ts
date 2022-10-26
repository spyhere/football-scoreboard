import {
  Match,
  Score,
  Teams
} from "../types"

interface ScoreboardI {
  activeMatchesCount: number
  addMatch(teams: Teams): string
  finishMatch(teams: Teams): string | null
  updateScore(match: Match): string | null
  getSummary(): string[]
}

class Scoreboard implements ScoreboardI {
  private readonly matches: Match[]

  constructor(matches: Match[] = []) {
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

  private isInputScoreValid(score: Score, refScore: Score) {
    if ((score[0] + score[1]) - (refScore[0] + refScore[1]) === 1) {
      return true
    } else {
      console.error("Cannot update the match, score isn't valid")
      return false
    }
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
      console.error("Cannot finish the match that doesn't exist")
      return null
    }
  }

  public updateScore(match: Match): string | null {
    const [teams, score] = match
    const foundIndex = this.findMatchIndex(teams)

    if (foundIndex && this.isInputScoreValid(score, this.matches[foundIndex][1])) {
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
