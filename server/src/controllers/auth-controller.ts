import { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user-model";
import { UserAttributes } from "../types/user";
const JWT_SECRET = process.env.JWT_SECRET as string;

const register = async (req: Request, res: Response): Promise<void> => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    res
      .status(400)
      .json({ error: "Fullname, email, and password are required." });
    return;
  }

  try {
    // Create the new user
    const newUser = await User.create({
      fullname,
      email,
      password_hash: password,
    });

    const userData = newUser.get() as UserAttributes;

    // Send a success response
    res.status(201).json({
      message: "Registration successfully",
      user: {
        id: userData.id,
        fullname: userData.fullname,
        email: userData.email,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Server error during registration" });
    }
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required." });
    return;
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }

    const userData = user.get() as UserAttributes;

    const isPasswordValid = await bcrypt.compare(
      password,
      userData.password_hash
    );
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }

    // Generate JWT
    const token = jwt.sign(
      { id: userData.id, email: userData.email },
      JWT_SECRET,
      { expiresIn: "30s" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Login successful",
        user: {
          id: userData.id,
          fullname: userData.fullname,
          email: userData.email,
        },
      });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Unknown error during login" });
    }
  }
};

const logout = (req: Request, res: Response): void => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "none",
  });

  res.status(200).json({ message: "Logged out successfully." });
};

export { register, login, logout };
