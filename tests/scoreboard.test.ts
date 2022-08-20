class ScoreBoard {
  constructor(matches) {
  }
}

describe("Scoreboard basic operations", () => {
  let board
  const initialMatches = [
    [["Mexico", "Canada"], [0, 5]],
    [["Spain", "Brazil"], [10, 2]],
    [["Germany", "France"], [2, 2]],
    [["Uruguay", "Italy"], [6, 6]],
    [["Argentina", "Australia"], [3, 1]],
  ]

  beforeEach(() => {
    board = new ScoreBoard(initialMatches)
  })

  it("should start new game", () => {
    const [homeTeam, guestTeam] = ["Team A", "Team B"]
    const newMatch = board.addMatch([homeTeam, guestTeam])
    expect(newMatch).toBe(`${homeTeam} 0 - ${guestTeam} 0`)
    expect(board.activeMatchesCount).toBe(initialMatches.length + 1)
  })

  it("finish game currently in progress", () => {
    const [match, score] = initialMatches[2]
    const result = board.finishMatch(match)
    expect(result).toBe(`${match[0]} ${score[0]} - ${match[1]} - ${score[1]}`)
    expect(board.activeMatchesCount).toBe(initialMatches.length - 1)
  })

  it.todo("update the score")

  it.todo("get a summary of games in progress ordered by their total score")

})
