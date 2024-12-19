import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import user from "../models/user";
import jwt from "jsonwebtoken";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, email, password, role } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new user({ name, email, password: hashedPassword, role });
    await newUser.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const fetchedUser = await user.findOne({ email });
    if (!fetchedUser)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, fetchedUser.password);
    if (!isMatch)
      return res.status(400).json({ message: "password doesn't match" });

    const token = jwt.sign(user, process.env.JWT_SECRET!!);

    res.json({ token });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
    });
  }
};

export const dashBoard = (req: Request, res: Response) => {
  res.render("dashboard", { user: req.user });
};
