const express = require("express");
const router = express.Router();
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../db/db-functions");
const passport = require("passport");

// __________________________________________________________________
// __________________________routes__________________________________
// __________________________________________________________________
const postLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: info.message || "Invalid credentials",
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error during login",
        });
      }

      return res.status(200).json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          // Add other user fields you want to send to client
          // but avoid sending sensitive information like password
        },
      });
    });
  })(req, res, next);
};

// __________________________________________________________________
// __________________________routes__________________________________
// __________________________________________________________________
router.route("/login").post(checkNotAuthenticated, postLogin);

// router.route("/register").post(checkNotAuthenticated, postRegister);

// router.route("/logout").post(postLogout);

module.exports = router;
