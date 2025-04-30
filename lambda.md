import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const itemsTableName = "http-sabastian-leeper-items";
const matchTableName = "http-sabastian-leeper-match";
const playersTableName = "http-sabastian-leeper-players";

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    switch (event.routeKey) {
      // Items Routes
      case "DELETE /items/{id}":
        await dynamo.send(
          new DeleteCommand({
            TableName: itemsTableName,
            Key: {
              id: event.pathParameters.id,
            },
          })
        );
        body = `Deleted item ${event.pathParameters.id}`;
        break;

      case "GET /items/{id}":
        body = await dynamo.send(
          new GetCommand({
            TableName: itemsTableName,
            Key: {
              id: event.pathParameters.id,
            },
          })
        );
        body = body.Item;
        break;

      case "GET /items":
        body = await dynamo.send(
          new ScanCommand({ TableName: itemsTableName })
        );
        body = body.Items;
        break;

      case "PUT /items":
        let requestJSON = JSON.parse(event.body);
        await dynamo.send(
          new PutCommand({
            TableName: itemsTableName,
            Item: {
              id: requestJSON.id,
              price: requestJSON.price,
              name: requestJSON.name,
            },
          })
        );
        body = `Put item ${requestJSON.id}`;
        break;

      // Match Routes ( PUT CHANGED IN CHECKPOINT 2)
      case "PUT /match":
      const matchData = JSON.parse(event.body);
      const { matchId, player1Id, player2Id, player1Score, player2Score, gameName, matchDate, matchNotes } = matchData;
  
      // Fetch current Elo ratings for both players
      const player1 = await dynamo.send(
          new GetCommand({
              TableName: playersTableName,
              Key: { playerId: player1Id },
          })
      );
      const player2 = await dynamo.send(
          new GetCommand({
              TableName: playersTableName,
              Key: { playerId: player2Id },
          })
      );
  
      const player1Rating = player1.Item?.elo || 1500; // Default Elo is 1500
      const player2Rating = player2.Item?.elo || 1500;
  
      // Calculate new Elo ratings
      const { playerNewRating, opponentNewRating } = calcElo(
          player1Rating,
          player2Rating,
          player1Score,
          player2Score
      );
  
      // Update Elo ratings in the database
      await dynamo.send(
          new PutCommand({
              TableName: playersTableName,
              Item: { playerId: player1Id, elo: playerNewRating },
          })
      );
      await dynamo.send(
          new PutCommand({
              TableName: playersTableName,
              Item: { playerId: player2Id, elo: opponentNewRating },
          })
      );
  
      // Save the match data in the match table
      await dynamo.send(
          new PutCommand({
              TableName: matchTableName,
              Item: {
                  matchId,
                  player1Id,
                  player2Id,
                  player1Score,
                  player2Score,
                  gameName,
                  matchDate,
                  matchNotes,
              },
          })
      );
  
      body = {
          matchId,
          player1Id,
          player1NewElo: playerNewRating,
          player2Id,
          player2NewElo: opponentNewRating,
      };
      break;

      case "GET /match":
        body = await dynamo.send(
          new ScanCommand({ TableName: matchTableName })
        );
        body = body.Items;
        break;

      case "GET /match/{matchId}":
        body = await dynamo.send(
          new GetCommand({
            TableName: matchTableName,
            Key: {
              matchId: event.pathParameters.matchId,
            },
          })
        );
        body = body.Item;
        break;

      case "DELETE /match/{matchId}":
        await dynamo.send(
          new DeleteCommand({
            TableName: matchTableName,
            Key: {
              matchId: event.pathParameters.matchId,
            },
          })
        );
        body = `Deleted match ${event.pathParameters.matchId}`;
        break;

        

         // get elo from id (checkpoint 2)
         case "DELETE /players/{playerId}":
          await dynamo.send(
            new DeleteCommand({
              TableName: playersTableName,
              Key: {
                playerId: event.pathParameters.playerId,
              },
            })
          );
          body = `Deleted player ${event.pathParameters.playerId}`;
          break;
          
      case "GET /players/{playerId}":
        const playerId = event.pathParameters.playerId;

        // Fetch the player's data from the DynamoDB table
        const playerData = await dynamo.send(
          new GetCommand({
            TableName: playersTableName,
            Key: { playerId: playerId },
          })
        );

        // Check if the player exists
        if (!playerData.Item) {
          throw new Error(`Player with ID ${playerId} not found.`);
        }

        body = {
          playerId: playerId,
          elo: playerData.Item.elo || 1500, // default elo 1500, again.
        };
        break;

      case "GET /leaderboard":
        try {
        const queryParams = event.queryStringParameters || {};
        const { playerId, position, rating } = queryParams;

      // get the data
    const playersData = await dynamo.send(
    new ScanCommand({ TableName: playersTableName })
  );

  let players = playersData.Items || [];

  
  // sort the players
  players.sort((a, b) => (b.elo || 1500) - (a.elo || 1500));

  // add the position as a thingy
  players = players.map((player, index) => ({
    position: index + 1,
    playerId: player.playerId,
    elo: player.elo || 1500,
  }));

  // filters for html page
  if (playerId) {
    players = players.filter((player) => player.playerId === playerId);
  }
  if (position) {
    players = players.filter((player) => player.position === parseInt(position, 10));
  }
  if (rating) {
    players = players.filter((player) => player.elo === parseInt(rating, 10));
  }

  // return final leaderboarrd yey
  body = players;
} catch (error) {
  throw new Error(`Error fetching leaderboard: ${error.message}`);
}
  break;

      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = `Error: ${err.message}`;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};

/**
 * Calculate some new elo ratings! Importantly, I iterated a bit here to make match score matter for the function. Copied from the project.
 * @param {number} playerRating - current Elo rating of a player.
 * @param {number} opponentRating - Current Elo rating of their opponent.
 * @param {number} playerScore - Score of the player (e.g., 1 for win, 0 for loss, 0.5 for draw).
 * @param {number} opponentScore - Score of the opponent (e.g., 1 for win, 0 for loss, 0.5 for draw).
 * @returns {object} New Elo ratings and Elo change for the player.
 */
export function calcElo(playerRating, opponentRating, playerScore, opponentScore) {
  const K = 32; // Default K-factor
  const totalGames = playerScore + opponentScore;
  const marginOfVictory = Math.abs(playerScore - opponentScore);
  const adjustedK = K * (1 + marginOfVictory / totalGames); // Adjust K-factor based on score margin

  // Calculate expected scores
  const expectedScore = (rating, opponentRating) =>
      1 / (1 + Math.pow(10, (opponentRating - rating) / 400));

  const playerExpected = expectedScore(playerRating, opponentRating);
  const opponentExpected = expectedScore(opponentRating, playerRating);

  // Determine actual results
  const playerResult = playerScore > opponentScore ? 1 : playerScore < opponentScore ? 0 : 0.5;
  const opponentResult = 1 - playerResult;

  // Calculate new ratings
  const playerNewRating = playerRating + adjustedK * (playerResult - playerExpected);
  const opponentNewRating = opponentRating + adjustedK * (opponentResult - opponentExpected);

  return {
      playerNewRating: Math.round(playerNewRating),
      opponentNewRating: Math.round(opponentNewRating),
      eloChange: Math.round(playerNewRating - playerRating),
  };
}