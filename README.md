# Football Scoreboard mini library

### test technical task

This is the scoreboard for keeping live matches with scores. It was written using <b>"Test-Driven-Development" (TDD)</b>
with Typescript.

## The library is capable of:

- Being initialized with games or no games already in progress
- To start new game
- To finish the game
- To update the score of the game
- To get the ordered summary of games

## Edge cases considered:

- Can initialize with/without list of games
- `Null` is returned when game cannot be found during finish/update operations
- `console.error` is shot when input isn't valid

## Data type

I decided to use 2-leveled arrays instead of objects to handle data. The schema
is: `[[homeTeamName, awayTeamName], [homeTeamScore, awayTeamScore]]`

Using objects it would look as follows:

```
{
  "teams": {
   "home": homeTeamName,
   "away": awayTeamName
  },
  "score": {
   "home": homeTeamScore,
   "away": awayTeamScore
  }
}
```

The code inside library would be more readable when using objects instead of 2-leveled arrays, but on the contrary it
would be too much verbose for user of this library adding redundant boiler code.

