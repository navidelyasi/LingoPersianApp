if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const sequelizeDB = require("./db/db-init");
const { User } = require("./db/models");
const auth = require("./routes/auth");

// __________________________________________________________________
// ______________    GENERAL       init    __________________________
// __________________________________________________________________
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

// __________________________________________________________________
// ______________________________listen______________________________
// __________________________________________________________________
const start = async () => {
  try {
    await sequelizeDB.authenticate();
    console.log("Connection has been established successfully.");
    app.listen(process.env.PORT, () =>
      console.log(`Server is listening on port ${process.env.PORT}...`)
    );
  } catch (error) {
    console.log(error);
    console.error("Unable to connect to the database:", error);
  }
};

start();
