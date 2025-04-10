import { Request, Response } from "express";
import User from "../models/user-model";

const getMe = async (req: Request, res: Response): Promise<void> => {
  const userId = req.body.user.id;
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const { id, email, fullname } = user.get();

    res.status(200).json({
      message: "User details retrieved successfully",
      user: {
        id,
        email,
        fullname,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error!",
    });
  }
};

export { getMe };
