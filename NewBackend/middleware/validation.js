const UserModel = require("../modals/userAuthModal");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

app.use(cookieParser());

const isAuthenticatedUser = async (req, res, next) => {
  const token = req.cookies.token;

  try {
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "login user access this step",
        token,
      });
    }
    const decdedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await UserModel.findById(decdedData.id);

    if (!req.user) {
      res.clearCookie("token");
      return res.end();
    }

    next();
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "internal server error",
    });
  }
};

// Export the function using CommonJS syntax
module.exports = { isAuthenticatedUser };
