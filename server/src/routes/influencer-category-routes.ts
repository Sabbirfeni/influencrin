// Import necessary modules and controllers
import express from "express";

import * as InfluencerCategoryController from "../controllers/influencer-category-controller";

import authenticate from "../middleware/authenticate";

const influencerCategoryRoutes = express.Router();

influencerCategoryRoutes.get(
  "/",
  InfluencerCategoryController.getAllInfluencerCategories
);

influencerCategoryRoutes.post(
  "/:influencer_id",
  authenticate,
  InfluencerCategoryController.createCategoriesForInfluencer
);

export default influencerCategoryRoutes;
