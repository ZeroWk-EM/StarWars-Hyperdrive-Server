import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/user.model";
import IUser from "../interface/user.interface";

dotenv.config();

export const registerUser = async ({ body }: Request, res: Response) => {
  const userBody: IUser = {
    image: body.image,
    name: body.name,
    surname: body.surname,
    role: body.role,
    username: body.username,
    email: body.email,
    password: await bcrypt.hash(body.password, 10),
  };
  try {
    const newUser = await User.create(userBody);
    if (newUser)
      return res
        .status(201)
        .json({ status: 201, message: "Successfully registered user" });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error });
  }
};

export const loginUser = async ({ body }: Request, res: Response) => {
  const { email, password }: IUser = body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (passwordCompare) {
        const token = jwt.sign(
          { _id: user.id, role: user.role },
          String(process.env.SECRET_KEY)
        );
        return res.status(200).json({
          status: 200,
          message: "Auth Success",
          token,
        });
      }
      return res.status(400).json({ status: 400, message: "Wrong Password" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: 400, message: error });
  }
};
