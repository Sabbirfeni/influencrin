// Import necessary modules and controllers
import express from "express";
import * as InfluencerSocialPlatformController from "../controllers/influencer-social-platform-controller";
import authenticate from "../middleware/authenticate";

const influencerSocialPlatformRoutes = express.Router();

/**
 * @route   GET /api/influencers/social-platforms
 * @desc    Fetch all social media platforms used by influencers
 * @access  Public
 */
influencerSocialPlatformRoutes.get(
  "/",
  InfluencerSocialPlatformController.getAllSocialMediaPlatforms
);

/**
 * @route   POST /api/influencers/social-platforms/:influencer_id
 * @desc    Create social media platform entry for a specific influencer
 * @access  Private
 * @body    {
 *            platform_id: string,
 *            platform_profile_link: string,
 *            follower_count?: number
 *          }
 */
influencerSocialPlatformRoutes.post(
  "/:influencer_id",
  authenticate,
  InfluencerSocialPlatformController.createInfluencerSocialPlatform
);

/**
 * @route   PUT /api/influencers/social-platforms/:influencer_id
 * @desc    Update social media platform entry for a specific influencer
 * @access  Private
 * @body    {
 *            platform_id: string,
 *            platform_profile_link: string,
 *            follower_count?: number
 *          }
 */
influencerSocialPlatformRoutes.put(
  "/:influencer_id",
  authenticate,
  InfluencerSocialPlatformController.updateInfluencerSocialPlatform
);

/**
 * @route   DELETE /api/influencers/social-platforms/:influencer_id
 * @desc    Delete social media platform entry for a specific influencer
 * @access  Private
 * @body    { platform_id: string }
 */
influencerSocialPlatformRoutes.delete(
  "/:influencer_id",
  authenticate,
  InfluencerSocialPlatformController.deleteInfluencerSocialPlatform
);

export default influencerSocialPlatformRoutes;
