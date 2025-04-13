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

    const previousImage = user.get("profile_image") as string;

    if (file) {
      // Temporarily set new image (don't delete old one yet)
      user.set("profile_image", file.filename);
    }

    try {
      await user.save(); // Only save now
    } catch (error) {
      // If saving failed, clean up the uploaded new file (optional)
      if (file) {
        const newImagePath = path.join(
          __dirname,
          "../../public/images/uploads/user-profiles",
          file.filename
        );
        if (fs.existsSync(newImagePath)) {
          fs.unlinkSync(newImagePath); // Clean up failed upload
        }
      }

      res.status(500).json({ error: "Failed to update user profile." });
      return;
    }

    // Now safe to delete the previous image
    if (file && previousImage && previousImage !== file.filename) {
      const oldImagePath = path.join(
        __dirname,
        "../../public/images/uploads/user-profiles",
        previousImage
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Delete after successful save
      }
    }

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
