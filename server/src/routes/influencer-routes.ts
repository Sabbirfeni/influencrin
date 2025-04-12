// Import necessary modules and controllers
import express from "express";
import * as InfluencerController from "../controllers/influencer-controller";
import * as InfluencerManagementController from "../controllers/influencer-management-controller";
import authenticate from "../middleware/authenticate";

const influencerRoutes = express.Router();

/**
 * Public route - Fetch all influencers
 * GET /api/influencers
 */
influencerRoutes.get("/", InfluencerController.getAllInfluencers);

/**
 * Protected route - Get influencers created by the authenticated user
 * GET /api/influencers/me
 */
influencerRoutes.get(
  "/me",
  authenticate,
  InfluencerController.getInfluencersByUser
);

/**
 * Public route - Get a specific influencer by their unique handle
 * GET /api/influencers/:handle
 */
influencerRoutes.get("/:handle", InfluencerController.getInfluencer);

/**
 * Protected route - Create a new influencer entry
 * POST /api/influencers
 */
influencerRoutes.post("/", authenticate, InfluencerController.createInfluencer);

/**
 * Protected route - Update an existing influencer (by handle)
 * PUT /api/influencers/:handle
 */
influencerRoutes.put(
  "/:influencer_id",
  authenticate,
  InfluencerManagementController.updateInfluencer
);

/**
 * Protected route - Delete an influencer (by handle)
 * DELETE /api/influencers/:handle
 */
influencerRoutes.delete(
  "/:influencer_id",
  authenticate,
  InfluencerManagementController.deleteInfluencer
);

export default influencerRoutes;
