require("dotenv").config();
const express = require("express");
const router = express.Router();
const {
  authenticateToken,
  preventAuthenticatedAccess,
} = require("../db/db-functions");
const jwt = require("jsonwebtoken");
const { User } = require("../db/models");
const bcrypt = require("bcrypt");

// __________________________________________________________________
// __________________________ Home __________________________________
// __________________________________________________________________
const getHome = async (req, res) => {
  return res.status(200).json({ success: true });
};

// __________________________________________________________________
// __________________________ Login __________________________________
// __________________________________________________________________
const postLogin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        success: false,
        message: "Missing email or password",
      });
    }

    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const tokenPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const accessToken = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET);

    return res.status(200).json({
      success: true,
      accessToken: accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

// __________________________________________________________________
// __________________________ Signup __________________________________
// __________________________________________________________________
const postSignup = async (req, res) => {
  try {
    if (!req.body.password || !req.body.name || !req.body.email) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (name, email, or password)",
      });
    }

    const availableUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (availableUser)
      return res.status(400).json({
        success: false,
        message: "email is available in DB",
      });

    const hp = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hp,
    });

    const tokenPayload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    const accessToken = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET);

    return res
      .status(200)
      .json({ success: true, accessToken: accessToken, name: req.body.name });
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
router.route("/home").get(authenticateToken, getHome);

router.route("/login").post(preventAuthenticatedAccess, postLogin);

router.route("/signup").post(preventAuthenticatedAccess, postSignup);

module.exports = router;
