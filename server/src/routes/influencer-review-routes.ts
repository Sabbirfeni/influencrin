// Import necessary modules and controllers
import express from "express";
import * as InfluencerReviewController from "../controllers/influencer-review-controller";
import authenticate from "../middleware/authenticate";

const influencerReviewRoutes = express.Router();

influencerReviewRoutes.post(
  "/:influencer_id",
  authenticate,
  InfluencerReviewController.createReviewForInfluencer
);

export default influencerReviewRoutes;
