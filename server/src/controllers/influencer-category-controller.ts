import { Request, Response } from "express";
import InfluencerCategory from "../models/influencer-category-model";
import { sequelize } from "../db/sequelize";
import Influencer from "../models/influencer-model";

const getAllInfluencerCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categoriesRaw = (await InfluencerCategory.findAll({
      attributes: [
        [
          sequelize.fn("LOWER", sequelize.col("category_name")),
          "category_name",
        ],
      ],
      group: [sequelize.fn("LOWER", sequelize.col("category_name"))],
      order: [[sequelize.fn("LOWER", sequelize.col("category_name")), "ASC"]],
      raw: true,
    })) as unknown as Array<{ category_name: string }>;

    const categories = categoriesRaw.map((item) => item.category_name);

    if (categories.length === 0) {
      res.status(404).json({ message: "No categories found." });
      return;
    }

    res.status(200).json({
      message: "Unique categories retrieved successfully.",
      categories: categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const createCategoriesForInfluencer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { influencer_id } = req.params;
    const userId = req.body?.user?.id;
    const { categories } = req.body;

    if (!influencer_id) {
      res.status(400).json({ message: "Influence ID is required." });
      return;
    }

    if (!categories || categories.length === 0) {
      res.status(400).json({ message: "Categories are required" });
      return;
    }
    // Step 1: Check if influencer exists and belongs to the user
    const influencer = await Influencer.findOne({
      where: { id: influencer_id, user_id: userId },
    });

    if (!influencer) {
      res.status(404).json({
        message: "Influencer not found or unauthorize",
      });
      return;
    }

    // Creating categories for the influencer
    const createdCategories = await InfluencerCategory.bulkCreate(
      categories.map((category: string) => ({
        influencer_id,
        category_name: category,
      }))
    );

    res.status(201).json({
      message: "Categories created successfully",
      categories: createdCategories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllInfluencerCategories, createCategoriesForInfluencer };
