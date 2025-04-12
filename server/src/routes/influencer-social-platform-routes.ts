// Import necessary modules and controllers
import express from "express";
import * as InfluencerSocialPlatformController from "../controllers/influencer-social-platform-controller";
import authenticate from "../middleware/authenticate";

const influencerSocialPlatformRoutes = express.Router();

influencerSocialPlatformRoutes.post(
  "/:influencer_id",
  authenticate,
  InfluencerSocialPlatformController.createInfluencerSocialPlatform
);

influencerSocialPlatformRoutes.put(
  "/:influencer_id",
  authenticate,
  InfluencerSocialPlatformController.updateInfluencerSocialPlatform
);

export default influencerSocialPlatformRoutes;
