// Import necessary modules and controllers
import express from "express";
import * as InfluencerController from "../controllers/influencer-controller";
import * as InfluencerManagementController from "../controllers/influencer-management-controller";
import authenticate from "../middleware/authenticate";

// Create a new router instance for influencer
const influencerRoutes = express.Router();

/**
 * @route   GET /api/influencers
 * @desc    Fetch all influencers (public access)
 * @access  Public
 */
influencerRoutes.get("/", InfluencerController.getAllInfluencers);

/**
 * @route   GET /api/influencers/me
 * @desc    Get influencers created by the authenticated user
 * @access  Private
 * @body    None
 */
influencerRoutes.get(
  "/me",
  authenticate,
  InfluencerController.getInfluencersByUser
);

/**
 * @route   GET /api/influencers/:handle
 * @desc    Get a specific influencer by their unique handle
 * @access  Public
 * @body    None
 */
influencerRoutes.get("/:handle", InfluencerController.getInfluencer);

/**
 * @route   POST /api/influencers
 * @desc    Create a new influencer
 * @access  Private
 * @body    {
 *            fullname: string,
 *            handle: string,
 *            profile_image: string,
 *            bio?: string,
 *            location: string,
 *            socialPlatforms: [{ platform_id: string, follower_count: number, platform_profile_link: string }],
 *            categories: string[]
 *          }
 */
influencerRoutes.post("/", authenticate, InfluencerController.createInfluencer);

/**
 * @route   PUT /api/influencers/:influencer_id
 * @desc    Update an existing influencer by ID
 * @access  Private
 * @body    {
 *            fullname: string,
 *            handle: string,
 *            profile_image: string,
 *            bio?: string,
 *            location: string,
 *            socialPlatforms: [{ platform_id: string, follower_count: number, platform_profile_link: string }],
 *            categories: string[]
 *          }
 */
influencerRoutes.put(
  "/:influencer_id",
  authenticate,
  InfluencerManagementController.updateInfluencer
);

/**
 * @route   DELETE /api/influencers/:influencer_id
 * @desc    Delete an influencer by ID
 * @access  Private
 * @body    None
 */
influencerRoutes.delete(
  "/:influencer_id",
  authenticate,
  InfluencerManagementController.deleteInfluencer
);

export default influencerRoutes;
