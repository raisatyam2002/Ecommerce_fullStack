import { Request, Response, response } from "express";
import userModel from "../models/userModel";
import { hashPassword, comparePassword } from "../helper/authHelper";
import JWT from "jsonwebtoken";
// import
export const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, address } = await req.body;
    if (!name) {
      res.send({ error: "name is required" });
    }
    if (!email) {
      res.send({ error: "email is required" });
    }
    if (!password) {
      res.send({ error: "password is required" });
    }
    if (!phone) {
      res.send({ error: "phone is required" });
    }
    if (!address) {
      res.send({ error: "address is required" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      //   console.log("existing user is", existingUser)
      return res.status(200).send({
        succes: false,
        message: "User already exist please login",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
      address: address,
    }).save();
    // console.log(result);
    console.log(user);

    res.status(201).send({
      success: true,
      message: "User created succesfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in registaring user",
      error: error,
    });
  }
};
export const loginController = async (req: Request, res: Response) => {
  const { email, password } = await req.body;
  if (!email || !password) {
    return res.status(404).send({
      error: "user detail invalid",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        message: "email not regsitered",
      });
    }
    const match = comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        succes: false,
        message: "Invalid password",
      });
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = JWT.sign({ _id: user._id }, secret, { expiresIn: "7d" });
    res.status(200).send({
      succes: true,
      message: "user logged in succesfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token: token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in login",
      error: error,
    });
  }
};
export const testController = (req: Request, res: Response) => {
  console.log("test controller testing");
  return res.status(200).send({
    message: "testin succesfull",
  });
};
