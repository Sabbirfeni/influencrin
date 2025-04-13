import { Request, Response } from "express";
import { ValidationError, Op, Sequelize } from "sequelize";
import { sequelize } from "../db/sequelize";
import Influencer from "../models/influencer-model";
import InfluencerSocialPlatform from "../models/influencer-social-platform-model";
import InfluencerCategory from "../models/influencer-category-model";
import SocialMediaPlatform from "../models/social-media-platform-model";
import InfluencerReview from "../models/influencer-review-model";

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
    } = req.body as {
      fullname: string;
      handle: string;
      profile_image: string;
      bio?: string;
      location: string;
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

    // Check for duplicate platform_ids in the payload
    const seenPlatformIds = new Set<string>();
    const duplicatePlatform = platformsFromBody.find((platform) => {
      if (seenPlatformIds.has(platform.platform_id)) {
        return true;
      }
      seenPlatformIds.add(platform.platform_id);
      return false;
    });
    if (duplicatePlatform) {
      res.status(400).json({
        message: "Can't add same platform multiple times.",
      });
      return;
    }

    // Check for duplicate categories in the payload (case-insensitive)
    const seenCategories = new Set<string>();
    const duplicateCategory = categories.find((category) => {
      const lower = category.trim().toLowerCase();
      if (seenCategories.has(lower)) return true;
      seenCategories.add(lower);
      return false;
    });
    if (duplicateCategory) {
      res.status(400).json({
        message: "Can't add the same category multiple times.",
        field: "categories",
        duplicate: duplicateCategory,
      });
      return;
    }

    // Check for handle uniqueness (case-insensitive)
    const existingInfluencer = await Influencer.findOne({
      where: {
        handle: {
          [Op.iLike]: handle,
        },
      },
    });

    if (existingInfluencer) {
      res.status(400).json({
        message: "The handle is already taken.",
        field: "handle",
      });
      return;
    }

    // Create influencer
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

    // Prepare and create social platforms
    const socialEntries = platformsFromBody.map((platform) => ({
      ...platform,
      influencer_id: influencerId,
    }));

    await InfluencerSocialPlatform.bulkCreate(socialEntries, { transaction });

    // Prepare and create categories
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
        res.status(400).json({
          message: uniqueError.message,
          field: "platform_profile_link",
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

    if (influencers.length === 0) {
      res.status(404).json({ message: "No influencers found." });
      return;
    }

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

const searchOrGetInfluencers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      q,
      platform_name,
      category,
      min_followers,
      max_followers,
      min_rating,
    } = req.query;

    const whereClause: any = {};
    const include: any = [
      {
        model: InfluencerSocialPlatform,
        attributes: ["platform_profile_link", "follower_count"],
        include: [
          {
            model: SocialMediaPlatform,
            attributes: ["platform_name", "platform_icon_url"],
          },
        ],
      },
      {
        model: InfluencerCategory,
        attributes: ["category_name"],
      },
      {
        model: InfluencerReview,
        attributes: [],
      },
    ];

    // 🔍 Search by fullname or handle

    if (q) {
      let normalizedQuery: string | undefined;

      if (typeof q === "string") {
        normalizedQuery = q.toLowerCase().replace(/\s+/g, "");
      }

      whereClause[Op.or] = [
        Sequelize.where(
          Sequelize.fn(
            "REPLACE",
            Sequelize.fn("LOWER", Sequelize.col("fullname")),
            " ",
            ""
          ),
          {
            [Op.like]: `%${normalizedQuery}%`,
          }
        ),
        { handle: { [Op.iLike]: `%${q}%` } },
      ];
    }

    // 🔎 Filter by platform_id
    if (platform_name) {
      include[0].include[0].where = {
        platform_name: {
          [Op.iLike]: `${platform_name}`,
        },
      };
      include[0].required = true;
    }

    // 🔎 Filter by category (case-insensitive)
    if (category) {
      include[1].where = Sequelize.where(
        Sequelize.fn(
          "LOWER",
          Sequelize.col("InfluencerCategories.category_name")
        ),
        "LIKE",
        `%${(category as string).toLowerCase()}%`
      );
      include[1].required = true;
    }

    // 🔎 Filter by follower count range
    if (min_followers || max_followers) {
      include[0].where = {
        ...(include[0].where || {}),
        follower_count: {
          ...(min_followers && { [Op.gte]: +min_followers }),
          ...(max_followers && { [Op.lte]: +max_followers }),
        },
      };
      include[0].required = true;
    }

    // 🧮 Define all the necessary attributes & Include avg review score

    const attributes: any = [
      "fullname",
      "handle",
      "profile_image",
      "location",
      [
        Sequelize.fn(
          "ROUND",
          Sequelize.fn("AVG", Sequelize.col("Reviews.rating"))
        ),
        "avg_review_score",
      ],
    ];

    // 🔎 Filter by avg review score
    let having: any;

    if (min_rating) {
      having = Sequelize.where(
        Sequelize.fn(
          "ROUND",
          Sequelize.fn("AVG", Sequelize.col("Reviews.rating"))
        ),
        {
          [Op.gte]: +min_rating,
        }
      );
    }

    const influencers = await Influencer.findAll({
      where: whereClause,
      include,
      attributes,
      group: [
        "Influencer.id",
        "InfluencerSocialPlatforms.id",
        "InfluencerSocialPlatforms->SocialMediaPlatform.id",
        "InfluencerCategories.id",
      ],
      having,
      order: [["createdAt", "DESC"]],
    });

    if (!influencers.length) {
      res.status(404).json({ message: "No influencers found." });
      return;
    }

    res.status(200).json({
      message: "Influencers fetched successfully.",
      influencers,
    });
  } catch (error: any) {
    console.error("Error fetching influencers:", error);
    res.status(500).json({
      message: error.message || "Internal server error.",
    });
  }
};

const getInfluencer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { handle } = req.params;

    if (!handle) {
      res.status(400).json({ message: "Handle is required." });
      return;
    }

    const influencer = await Influencer.findOne({
      where: {
        handle: {
          [Op.iLike]: handle, // case-insensitive match
        },
      },
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

    if (influencers.length === 0) {
      res.status(404).json({ message: "No influencers found." });
      return;
    }

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
  searchOrGetInfluencers,
  getInfluencer,
  getInfluencersByUser,
};
