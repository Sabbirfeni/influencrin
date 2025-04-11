import { Request, Response } from "express";
import { ValidationError } from "sequelize";
import Influencer from "../models/influencer-model";

const updateInfluencer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { handle } = req.params;
    const userId = req.body?.user?.id;

    if (!handle) {
      res.status(400).json({ message: "Handle is required." });
      return;
    }

    // Find influencer by handle and user_id
    const influencer = await Influencer.findOne({
      where: { handle, user_id: userId },
    });

    if (!influencer) {
      res
        .status(404)
        .json({ message: `Influencer not found for handle '${handle}'.` });
      return;
    }

    const { fullname, profile_image, bio, location } = req.body;

    const updateData: Partial<Record<string, any>> = {};
    if (fullname) updateData.fullname = fullname;
    if (profile_image) updateData.profile_image = profile_image;
    if (bio) updateData.bio = bio;
    if (location) updateData.location = location;
    // We're changing the handle once it set. So don't add it in the updateData or update the handle anyway.

    await influencer.update(updateData);

    res.status(200).json({
      message: "Influencer updated successfully.",
      data: influencer,
    });
  } catch (error: any) {
    if (error instanceof ValidationError) {
      res.status(400).json({
        message: error.errors[0].message,
        path: error.errors[0].path,
      });
      return;
    }

    res.status(500).json({
      message: error.message || "Internal server error.",
    });
  }
};

export { updateInfluencer };
