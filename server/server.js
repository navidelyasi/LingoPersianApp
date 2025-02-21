if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const sequelizeDB = require("./db/db-init");
const initPassport = require("./passport-config");
const { User } = require("./db/models");
const auth = require("./routes/auth");

// __________________________________________________________________
// ______________    GENERAL       init    __________________________
// __________________________________________________________________
initPassport(
  passport,
  async (email2) => await User.findOne({ where: { email: email2 } }),
  async (id) => await User.findByPk(id)
);
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// __________________________________________________________________
// ______________________________routes______________________________
// __________________________________________________________________
app.get("/api", (req, res) => {
  res.json({ names: ["Ali", "Naghi"] });
});
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
