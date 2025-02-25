if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const sequelizeDB = require("./db/db-init");
const auth = require("./routes/auth");
const game = require("./routes/game");

// __________________________________________________________________
// ______________    GENERAL       init    __________________________
// __________________________________________________________________
app.set("io", io);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("createGame", (gameId) => {
    socket.join(`game:${gameId}`);
  });

  socket.on("removeGame", (gameId) => {
    socket.leave(`game:${gameId}`);
  });

  socket.on("joinGame", (gameId) => {
    socket.join(`game:${gameId}`);
  });

  socket.on("leaveGame", (gameId) => {
    socket.leave(`game:${gameId}`);
  });

  socket.on("startGame", (gameId) => {
    socket.emit("startGame", gameId);
  });

  socket.on("updateActivePlayer", (gameId, activePlayerIndex) => {
    socket.emit("updateActivePlayer", gameId, activePlayerIndex);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

// __________________________________________________________________
// ______________________________routes______________________________
// __________________________________________________________________
app.use("/auth", auth);
app.use("/game", game);

// __________________________________________________________________
// ______________________________listen______________________________
// __________________________________________________________________
const start = async () => {
  try {
    await sequelizeDB.authenticate();
    console.log("Connection has been established successfully.");

    await sequelizeDB.sync({ alter: true });
    console.log("Database synchronized");

    server.listen(process.env.PORT, () =>
      console.log(`Server is listening on port ${process.env.PORT}...`)
    );
  } catch (error) {
    console.log(error);
    console.error("Unable to connect to the database:", error);
  }
};

start();
