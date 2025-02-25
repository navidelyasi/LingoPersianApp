const { DataTypes } = require("sequelize");
const sequelizeDB = require("./db-init");

const User = sequelizeDB.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure emails are unique
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Game = sequelizeDB.define("Game", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  host_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users", // References the Users table
      key: "id",
    },
  },
  players: {
    type: DataTypes.ARRAY(DataTypes.INTEGER), // Array of player IDs
    defaultValue: [],
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("waiting", "in_progress", "completed"),
    defaultValue: "waiting",
    allowNull: false,
  },
  active_player: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

// the relationship
Game.belongsTo(User, {
  foreignKey: "host_user_id",
  as: "host",
});
Game.belongsToMany(User, {
  as: "playerDetails",
  through: "GamePlayers",
  foreignKey: "game_id",
  otherKey: "user_id",
});

module.exports = { User, Game };
