window.onload = loaded;

/**
 * Simple Function that will be run when the browser is finished loading.
 */
function loaded() {
  // Assign to a variable so we can set a breakpoint in the debugger!
  const hello = sayHello();
  console.log(hello);
}

/**
 * This function returns the string 'hello'
 * @return {string} the string hello
 */
export function sayHello() {
  return "hello";
}

/**
 * Calculate some new elo ratings! Importantly, I iterated a bit here to make match score matter for the function.
 * @param {number} playerRating - current Elo rating of a player.
 * @param {number} opponentRating - Current Elo rating of their opponent.
 * @param {number} playerScore - Score of the player (e.g., 1 for win, 0 for loss, 0.5 for draw).
 * @param {number} opponentScore - Score of the opponent (e.g., 1 for win, 0 for loss, 0.5 for draw).
 * @returns {object} New Elo ratings and Elo change for the player.
 */
export function calcElo(
  playerRating,
  opponentRating,
  playerScore,
  opponentScore
) {
  const K = 32; // Default K-factor
  const totalGames = playerScore + opponentScore;
  const marginOfVictory = Math.abs(playerScore - opponentScore);
  const adjustedK = K * (1 + marginOfVictory / totalGames); // adjust based on magin of victory. I wanted it to be more chill if you had a similar score, and less if you didnt.

  // Calculate expected scores
  const expectedScore = (rating, opponentRating) =>
    1 / (1 + Math.pow(10, (opponentRating - rating) / 400));

  const playerExpected = expectedScore(playerRating, opponentRating);
  const opponentExpected = expectedScore(opponentRating, playerRating);

  // Determine actual results
  const playerResult =
    playerScore > opponentScore ? 1 : playerScore < opponentScore ? 0 : 0.5;
  const opponentResult = 1 - playerResult;

  // Calculate new ratings
  const playerNewRating =
    playerRating + adjustedK * (playerResult - playerExpected);
  const opponentNewRating =
    opponentRating + adjustedK * (opponentResult - opponentExpected);

  return {
    playerNewRating: Math.round(playerNewRating),
    opponentNewRating: Math.round(opponentNewRating),
    eloChange: Math.round(playerNewRating - playerRating)
  };
}

/**
 * small form sanitization function to stop any supposed malicious users doing cross site scripting n stuff.
 * @param {string} input - The user input to sanitize.
 * @returns {string} - The sanitized input.
 */
export function cleanPut(input) {
  const temp = document.createElement("div");
  temp.textContent = input.trim();
  return temp.innerHTML;
}
