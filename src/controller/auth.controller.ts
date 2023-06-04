import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/user.model";
import IUser from "../interface/user.interface";
import { v4 as uuidv4 } from "uuid";
import EmailConnection from "../config/nodeMailer.config";
import { VerifyAccount } from "../template/mailTemplate";

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
    verify: uuidv4(),
  };

  try {
    const newUser = await User.create(userBody);
    if (newUser)
      await EmailConnection(
        newUser.email,
        "Valide Email",
        VerifyAccount(String(newUser.verify))
      );
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
    const user = await User.findOne({ email, verify: { $exists: false } });
    if (user) {
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (passwordCompare) {
        const token = jwt.sign(
          { _id: user.id, role: user.role },
          String(process.env.SECRET_KEY)
        );
        return res.status(200).json({
          token,
        });
      }
      return res.status(400).json({ status: 400, message: "Wrong Password" });
    }
    return res.status(400).json({ message: "User not verified" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: 400, message: error });
  }
};

export const validateUser = async (
  { params: { verifytoken } }: Request,
  res: Response
) => {
  try {
    const validationUser = await User.findOneAndUpdate(
      { verify: verifytoken },
      { $unset: { verify: 1 } }
    );
    if (validationUser) {
      return res
        .status(200)
        .json({ message: "User enabled to CRUD operation" });
    }
    return res
      .status(400)
      .json({ message: "This token is not associated with any user" });
  } catch (error) {
    return res.status(400).json({ error_message: error });
  }
};
