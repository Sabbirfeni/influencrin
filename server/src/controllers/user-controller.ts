import { Request, Response } from "express";
import User from "../models/user-model";
import InfluencerReview from "../models/influencer-review-model";
import Influencer from "../models/influencer-model";
import fs from "fs";
import path from "path";

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

const updateMe = async (req: Request, res: Response): Promise<void> => {
  const userId = req.body.user.id;
  const { fullname } = req.body;
  const file = req.file;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Update the fullname if it's provided
    if (fullname !== undefined) user.set("fullname", fullname);

    // If a file is uploaded, save it to disk and update the user's profile_image
    // Handle profile image upload
    if (file) {
      const previousImage = user.get("profile_image") as string;

      // Delete previous image if it exists
      if (previousImage) {
        const imagePath = path.join(
          __dirname,
          "../../public/images/uploads/user-profiles",
          previousImage
        );
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); // Delete the file
        }
      }

      // Save new image filename
      user.set("profile_image", file.filename);
    }

    // Save the user data to the database
    await user.save();

    // Respond with the updated user data, including the profile image URL
    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user.get("id"),
        email: user.get("email"),
        fullname: user.get("fullname"),
        profile_image: user.get("profile_image"),
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export { getMe, updateMe, getReviewsByUser };
