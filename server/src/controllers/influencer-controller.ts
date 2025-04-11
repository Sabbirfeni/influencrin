import { Request, Response } from "express";
import { ValidationError, Op } from "sequelize";
import { sequelize } from "../db/sequelize";
import Influencer from "../models/influencer-model";
import InfluencerSocialPlatform from "../models/influencer-social-platform-model";
import InfluencerCategory from "../models/influencer-category-model";
import SocialMediaPlatform from "../models/social-media-platform-model";
import { InfluencerCreationAttributes } from "../types/influencer";

const createInfluencer = async (req: Request, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction();
  let socialPlatforms: {
    platform_id: string;
    follower_count: number;
    platform_profile_link: string;
  }[] = [];

  try {
    const user_id = req.body?.user?.id;
    const {
      fullname,
      handle,
      profile_image,
      bio,
      location,
      socialPlatforms: platformsFromBody,
      categories,
    } = req.body as InfluencerCreationAttributes & {
      socialPlatforms: {
        platform_id: string;
        follower_count: number;
        platform_profile_link: string;
      }[];
      categories: string[];
    };

    // assign so it's available in catch block
    socialPlatforms = platformsFromBody;

    if (
      !fullname ||
      !handle ||
      !profile_image ||
      !location ||
      !Array.isArray(platformsFromBody) ||
      platformsFromBody.length === 0 ||
      !Array.isArray(categories) ||
      categories.length === 0
    ) {
      res.status(400).json({ message: "Missing required fields." });
      return;
    }

    const influencer = await Influencer.create(
      {
        user_id,
        fullname,
        handle,
        profile_image,
        bio,
        location,
      },
      { transaction }
    );

    const influencerId = influencer.get("id") as string;

    const socialEntries = platformsFromBody.map((platform) => ({
      ...platform,
      influencer_id: influencerId,
    }));
    await InfluencerSocialPlatform.bulkCreate(socialEntries, { transaction });

    const categoryEntries = categories.map((name) => ({
      influencer_id: influencerId,
      category_name: name,
    }));
    await InfluencerCategory.bulkCreate(categoryEntries, { transaction });

    await transaction.commit();

    res.status(201).json({
      message: "Influencer created successfully.",
      influencer,
    });
  } catch (error: any) {
    await transaction.rollback();

    if (error instanceof ValidationError) {
      const uniqueError = error.errors.find(
        (err) =>
          err.type === "unique violation" &&
          err.path === "platform_profile_link"
      );

      if (uniqueError) {
        const offendingLink = socialPlatforms.find(
          (platform) => platform.platform_profile_link === uniqueError.value
        );

        res.status(400).json({
          message: uniqueError.message,
          platform_profile_link: uniqueError.value,
        });
        return;
      }
    }

    res.status(500).json({
      message: error.message || "Internal server error.",
    });
  }
};

const getAllInfluencers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const influencers = await Influencer.findAll({
      include: [
        {
          model: InfluencerSocialPlatform,
          as: "InfluencerSocialPlatforms",
          include: [
            {
              model: SocialMediaPlatform,
              as: "SocialMediaPlatform",
            },
          ],
        },
        {
          model: InfluencerCategory,
          as: "InfluencerCategories",
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      message: "Influencers fetched successfully.",
      influencers,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Internal server error.",
    });
  }
};

const getInfluencer = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.params);
    const { handle } = req.params;

    if (!handle) {
      res.status(400).json({ message: "Handle is required." });
      return;
    }

    const influencer = await Influencer.findOne({
      where: { handle },
      include: [
        {
          model: InfluencerSocialPlatform,
          as: "InfluencerSocialPlatforms",
          include: [
            {
              model: SocialMediaPlatform,
              as: "SocialMediaPlatform",
            },
          ],
        },
        {
          model: InfluencerCategory,
          as: "InfluencerCategories",
        },
      ],
    });

    if (!influencer) {
      res
        .status(404)
        .json({ message: `Influencer not found with handle "${handle}".` });
      return;
    }

    res
      .status(200)
      .json({ message: "Influencers fetched successfully.", influencer });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Internal server error.",
    });
  }
};

const getInfluencersByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.body?.user?.id; // or req.user?.id depending on your middleware

    if (!userId) {
      res.status(401).json({ message: "Unauthorized. User ID missing." });
      return;
    }

    const influencers = await Influencer.findAll({
      where: { user_id: userId },
      include: [
        {
          model: InfluencerSocialPlatform,
          as: "InfluencerSocialPlatforms",
          include: [{ model: SocialMediaPlatform, as: "SocialMediaPlatform" }],
        },
        {
          model: InfluencerCategory,
          as: "InfluencerCategories",
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      message: "Influencers fetched successfully.",
      influencers,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Internal server error.",
    });
  }
};

export {
  createInfluencer,
  getAllInfluencers,
  getInfluencer,
  getInfluencersByUser,
};
