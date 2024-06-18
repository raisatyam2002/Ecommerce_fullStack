import { Request, Response, response } from "express";
import userModel from "../models/userModel";
import { hashPassword, comparePassword } from "../helper/authHelper";
import JWT from "jsonwebtoken";
// import
export const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, address, answer } = await req.body;
    if (!name) {
      return res.send({
        message: "name is required",
      });
    }
    if (!email) {
      return res.send({
        succes: false,
        message: "email is required",
      });
    }
    if (!password) {
      return res.send({
        succes: false,

        message: "password is required",
      });
    }
    if (!phone) {
      return res.send({
        succes: false,

        message: "phone is required",
      });
    }
    if (!address) {
      return res.send({
        succes: false,

        message: "address is required",
      });
    }
    if (!answer) {
      return res.send({
        succes: false,
        message: "answer is required",
      });
    }
    console.log(answer);

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
      answer: answer,
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
    return res.send({
      success: false,
      message: "user detail invalid",
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
      success: true,
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
export const forgetPasswordController = async (req: Request, res: Response) => {
  console.log("hitting controller");

  try {
    const { email, answer, newPassword } = req.body;
    if (!email || !answer) {
      return res.status(401).send({
        success: false,
        message: "fill all details",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Wrong email or answer",
      });
    }
    const hashedPassword = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });
    return res.status(201).send({
      success: true,
      message: "password changed succesfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "error in changin password",
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
