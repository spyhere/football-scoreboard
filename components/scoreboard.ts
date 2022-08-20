
export type Teams = [string, string]
export type Score = [number, number]
export type Match = [Teams, Score]


interface ScoreboardI {
  activeMatchesCount: number

  addMatch(newMatch: Teams)
}

class Scoreboard implements ScoreboardI {
  private matches: Match[]

  constructor(matches: Match[]) {
    this.matches = [...matches]
  }

  public get activeMatchesCount() {
    return this.matches.length
  }

  public addMatch(newMatch: Teams) {
    this.matches.push([newMatch, [0,0]])
    return `${newMatch[0]} 0 - ${newMatch[1]} 0`
  }

}

export default Scoreboard
