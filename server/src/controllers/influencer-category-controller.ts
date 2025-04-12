import { Request, Response } from "express";
import InfluencerCategory from "../models/influencer-category-model";
import { sequelize } from "../db/sequelize";

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

export { getAllInfluencerCategories };
