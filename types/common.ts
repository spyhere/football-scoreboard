type HomeTeamName = string
type AwayTeamName = string
export type Teams = [HomeTeamName, AwayTeamName]

type HomeTeamScore = number
type AwayTeamScore = number
export type Score = [HomeTeamScore, AwayTeamScore]
export type Match = [Teams, Score]
