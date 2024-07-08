import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
import config from "../config/config.js";

// Protected Routes token based
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      config.JWT
    );
    // console.log(req.headers.authorization);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

// admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};