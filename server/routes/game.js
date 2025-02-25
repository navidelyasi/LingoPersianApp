require("dotenv").config();
const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../db/db-functions");
const { User, Game } = require("../db/models");

// __________________________________________________________________
// __________________________ get All Games __________________________________
// __________________________________________________________________
const getGameList = async (req, res) => {
  try {
    // Get games with host user information
    let gameList = await Game.findAll({
      where: { status: "waiting" },
      include: [
        {
          model: User,
          as: "host",
          attributes: ["name"], // Only get the name
        },
      ],
    });

    // Get all unique player IDs from all games
    const playerIds = [...new Set(gameList.flatMap((game) => game.players))];

    // Get all players' names in one query
    const players = await User.findAll({
      where: { id: playerIds },
      attributes: ["id", "name"],
    });

    // Create a map of player IDs to names
    const playerMap = Object.fromEntries(
      players.map((player) => [player.id, player.name])
    );

    // Format the response
    const formattedGameList = gameList.map((game) => ({
      id: game.id,
      host_id: game.host_user_id,
      host_name: game.host.name,
      players: game.players.map((playerId) => ({
        id: playerId,
        name: playerMap[playerId],
      })),
      active_player: game.active_player,
    }));

    return res.status(200).json({
      success: true,
      gameList: formattedGameList,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
// __________________________________________________________________
// __________________________ get one Game __________________________________
// __________________________________________________________________
const getGameById = async (req, res) => {
  try {
    const gameid = req.query.gameid;
    const game = await Game.findByPk(gameid, {
      include: [
        {
          model: User,
          as: "host",
          attributes: ["name"],
        },
      ],
    });

    // Get players in a single query
    const playerDetails = await User.findAll({
      where: { id: game.players },
      attributes: ["id", "name"],
    });

    // Format the response
    const formattedGame = {
      id: game.id,
      host_id: game.host_user_id,
      host_name: game.host.name,
      players: playerDetails.map((player) => ({
        id: player.id,
        name: player.name,
      })),
      active_player: game.active_player,
    };

    return res.status(200).json({
      success: true,
      game: formattedGame,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

// __________________________________________________________________
// __________________________ create __________________________________
// __________________________________________________________________
const postCreateGame = async (req, res) => {
  try {
    const newGame = await Game.create({
      host_user_id: req.user.id,
      players: [req.user.id],
    });

    req.app.get("io").emit("gameCreated", {
      gameId: newGame.id,
      hostId: req.user.id,
      hostName: req.user.name,
    });

    return res.status(200).json({
      success: true,
      newGame: newGame,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

// __________________________ remove game __________________________________
const postRemoveGame = async (req, res) => {
  try {
    if (!req.body.gameid) {
      return res.status(400).json({
        success: false,
        message: "Missing game id",
      });
    }

    const game = await Game.findByPk(req.body.gameid);
    await game.destroy();

    req.app.get("io").emit("gameRemoved", {
      gameId: req.body.gameid,
    });

    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
// __________________________ add player __________________________________
const postAddPlayer = async (req, res) => {
  try {
    if (!req.body.gameid) {
      return res.status(400).json({
        success: false,
        message: "Missing game id",
      });
    }

    const gameid = req.body.gameid;
    const game = await Game.findByPk(gameid);
    if (
      !game || // invalid game id
      game.players.length >= 4 || // max 4 players reached
      game.players.includes(req.user.id) || // requested user already exists
      game.status !== "waiting" // game is already started or finished
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid game id",
      });
    }

    let players = [...game.players];
    players.push(req.user.id);

    await game.update({ players: players });
    await game.save();

    req.app.get("io").emit("playerJoined", {
      gameId: gameid,
      playerId: req.user.id,
      playerName: req.user.name,
    });

    return res.status(200).json({
      success: true,
      updatedGame: game,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
// __________________________ remove player __________________________________
const postRemovePlayer = async (req, res) => {
  try {
    if (!req.body.gameid) {
      return res.status(400).json({
        success: false,
        message: "Missing game id",
      });
    }

    const gameid = req.body.gameid;
    const game = await Game.findByPk(gameid);
    if (
      !game || // invalid game id
      !game.players.includes(req.user.id) || // user doesn't exists in the game
      game.status !== "waiting" // game is already started or finished
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid game id",
      });
    }

    let players = game.players.filter((playerId) => playerId !== req.user.id);

    await game.update({ players: players });
    await game.save();

    req.app.get("io").emit("playerLeft", {
      gameId: gameid,
      playerId: req.user.id,
      playerName: req.user.name,
    });

    return res.status(200).json({
      success: true,
      updatedGame: game,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
// __________________________ start game __________________________________
const postStartGame = async (req, res) => {
  try {
    if (!req.body.gameid) {
      return res.status(400).json({
        success: false,
        message: "Missing game id",
      });
    }

    const gameid = req.body.gameid;
    const game = await Game.findByPk(gameid);
    if (
      !game || // invalid game id
      game.status !== "waiting" // game is already started or finished
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid game id",
      });
    }

    await game.update({ status: "in_progress" });
    await game.save();

    // 1. Tell players in the game to navigate to game page
    req.app.get("io").to(`game:${gameid}`).emit("gameStarted", gameid);
    // 2. Tell everyone else to remove this game from their list
    req.app.get("io").emit("gameRemoved", { gameId: gameid });

    return res.status(200).json({
      success: true,
      updatedGame: game,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
// __________________________ Finish game __________________________________
const postFinishGame = async (req, res) => {
  try {
    if (!req.body.gameid) {
      return res.status(400).json({
        success: false,
        message: "Missing game id",
      });
    }

    const game = await Game.findByPk(req.body.gameid);
    if (
      !game || // invalid game id
      game.status !== "in_progress" // game is already started or finished
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid game id",
      });
    }

    await game.update({ status: "completed" });
    await game.save();

    return res.status(200).json({
      success: true,
      updatedGame: game,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
// __________________________ update active player ___________________________
const postUpdateActivePlayer = async (req, res) => {
  try {
    const game = await Game.findByPk(req.body.gameid);
    await game.update({ active_player: req.body.activePlayerIndex });
    await game.save();

    console.log("activePlayerIndex: ", req.body.activePlayerIndex);

    // tell players that active player has changed
    req.app
      .get("io")
      .to(`game:${req.body.gameid}`)
      .emit("activePlayerChanged", {
        gameId: req.body.gameid,
        activePlayerIndex: req.body.activePlayerIndex,
      });

    console.log("Emitted activePlayerChanged event");

    return res.status(200).json({
      success: true,
      updatedGame: game,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

// __________________________________________________________________
// __________________________routes__________________________________
// __________________________________________________________________

router.route("/list").get(authenticateToken, getGameList);

router.route("/create-game").post(authenticateToken, postCreateGame);
router.route("/remove-game").post(authenticateToken, postRemoveGame);
router.route("/add-player").post(authenticateToken, postAddPlayer);
router.route("/remove-player").post(authenticateToken, postRemovePlayer);
router.route("/start-game").post(authenticateToken, postStartGame);
router.route("/finish-game").post(authenticateToken, postFinishGame);

router.route("/get-game-by-id").get(authenticateToken, getGameById);
router
  .route("/update-active-player")
  .post(authenticateToken, postUpdateActivePlayer);

module.exports = router;
