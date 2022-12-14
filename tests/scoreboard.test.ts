import { Scoreboard } from "../components"
import initialMatches from "./fixtures/matches"
import { Match } from "../types"

describe("Scoreboard basic operations", () => {
  let board: Scoreboard

  beforeEach(() => {
    board = new Scoreboard(initialMatches)
  })

  it("should start new game", () => {
    const [homeTeam, guestTeam] = ["Team A", "Team B"]
    const newMatch = board.addMatch([homeTeam, guestTeam])
    expect(newMatch).toBe(`${homeTeam} 0 - ${guestTeam} 0`)
    expect(board.activeMatchesCount).toBe(initialMatches.length + 1)
  })

  it("finish game currently in progress", () => {
    const [teams, score] = initialMatches[2]
    const result = board.finishMatch(teams)
    expect(result).toBe(`${teams[0]} ${score[0]} - ${teams[1]} ${score[1]}`)
    expect(board.activeMatchesCount).toBe(initialMatches.length - 1)
  })

  it("update the score", () => {
    const [teams, score] = initialMatches[1]
    const newScore: [number, number] = [score[0], score[1] + 1]
    const result = board.updateScore([teams, newScore])
    expect(result).toBe(`${teams[0]} ${newScore[0]} - ${teams[1]} ${newScore[1]}`)
  })

  it("get a summary of games in progress ordered by their total score", () => {
    const matches: Match[] = [
      [["Mexico", "Canada"], [0 ,5]],
      [["Uruguay", "Italy"], [6 ,6]],
      [["Spain", "Brazil"], [10 ,2]],
    ]
    board = new Scoreboard(matches)

    const expectedSummary = [
      "Spain 10 - Brazil 2",
      "Uruguay 6 - Italy 6",
      "Mexico 0 - Canada 5"
    ]

    const summary = board.getSummary()
    expect(summary).toStrictEqual(expectedSummary)
  })

})
