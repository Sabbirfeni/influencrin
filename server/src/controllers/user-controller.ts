import { Request, Response } from "express";
import User from "../models/user-model";
import InfluencerReview from "../models/influencer-review-model";
import Influencer from "../models/influencer-model";

const getMe = async (req: Request, res: Response): Promise<void> => {
  const userId = req.body.user.id;
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const { id, email, fullname, profile_image } = user.get();

    res.status(200).json({
      message: "User details retrieved successfully",
      user: {
        id,
        email,
        fullname,
        profile_image,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error!",
    });
  }
};

const getReviewsByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id } = req.params;
    const loggedInUserId = req.body?.user?.id;

    if (user_id !== loggedInUserId) {
      res.status(403).json({ message: "Unauthorized access to reviews." });
      return;
    }

    const reviews = await InfluencerReview.findAll({
      where: { user_id },
      include: [
        {
          model: Influencer,
          attributes: ["id", "fullname", "handle", "profile_image", "location"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (reviews.length === 0) {
      res.status(404).json({ message: "No reviews yet." });
      return;
    }

    res.status(200).json({
      message: "Reviews fetched successfully.",
      reviews,
    });
  } catch (error) {
    console.error("Error fetching reviews by user:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export { getMe, getReviewsByUser };
