import { Request, Response } from "express";
import { Op, ValidationError } from "sequelize";
import Influencer from "../models/influencer-model";
import { sequelize } from "../db/sequelize";

const updateInfluencer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { influencer_id } = req.params;
    const userId = req.body?.user?.id;

    if (!influencer_id) {
      res.status(400).json({ message: "Influence ID is required." });
      return;
    }

    // Find influencer by handle and user_id
    const influencer = await Influencer.findOne({
      where: {
        id: influencer_id,
        user_id: userId,
      },
    });

    if (!influencer) {
      res.status(404).json({
        message: `Influencer not found or unauthorized.`,
      });
      return;
    }

    const { fullname, profile_image, bio, location } = req.body;

    /** 
    We're changing the handle once it set. 
    So don't add it in the updateData or update the handle anyway. 
    */
    const updateData: Partial<Record<string, any>> = {};
    if (fullname) updateData.fullname = fullname;
    if (profile_image) updateData.profile_image = profile_image;
    if (bio) updateData.bio = bio;
    if (location) updateData.location = location;

    await influencer.update(updateData);

    res.status(200).json({
      message: "Influencer updated successfully.",
      influencer,
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

const deleteInfluencer = async (req: Request, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction();
  try {
    const { influencer_id } = req.params;
    const user_id = req.body?.user?.id;

    if (!influencer_id) {
      res.status(400).json({ message: "Handle is required." });
      return;
    }

    const influencer = await Influencer.findOne({
      where: { id: influencer_id, user_id },
      transaction,
    });

    if (!influencer) {
      res.status(404).json({
        message: `Influencer not found or unauthorized.`,
      });
      return;
    }

    /** 
     This will automatically delete associated records 
    (InfluencerCategory, InfluencerSocialPlatform) due to onDelete: "CASCADE".
    */
    await influencer.destroy({ transaction });

    await transaction.commit();

    res.status(200).json({
      message: `Influencer and related data deleted successfully.`,
    });
  } catch (error: any) {
    await transaction.rollback();
    res.status(500).json({
      message: error.message || "Internal server error.",
    });
  }
};

export { updateInfluencer, deleteInfluencer };
