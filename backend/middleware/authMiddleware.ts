import JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import userModel from "../models/userModel";

export const requireSignin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .send({ message: "Authorization header is missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .send({ message: "Authorization format is Bearer <token>" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res
        .status(500)
        .send({ message: "Internal server error: JWT secret is not defined" });
    }

    try {
      const decode = await JWT.verify(token, secret);
      //   console.log("decode is", decode);

      req.user = decode;
      console.log("decode is ", decode);

      next();
    } catch (error) {
      return res.status(401).send({ message: "Invalid token" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error" });
  }
};
export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user._id; // Adjust according to your token payload structure
    console.log("user id is ", userId);
    if (!userId) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access",
      });
    }

    const user = await userModel.findById(userId);
    if (user?.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error" });
  }
};
