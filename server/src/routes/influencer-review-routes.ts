// Import necessary modules and controllers
import express from "express";
import * as InfluencerReviewController from "../controllers/influencer-review-controller";
import authenticate from "../middleware/authenticate";

const influencerReviewRoutes = express.Router();

/**
 * @route   GET /api/influencers/:influencer_id/reviews
 * @desc    Get all reviews for a specific influencer
 * @access  Public
 */
influencerReviewRoutes.get(
  "/:influencer_id",
  InfluencerReviewController.getReviewsForInfluencer
);

/**
 * @route   POST /api/influencers/:influencer_id/reviews
 * @desc    Create a review for a specific influencer (only once per user)
 * @access  Protected
 * @body    {
 *            rating: number (1-5) - required,
 *            comment: string - required
 *          }
 */
influencerReviewRoutes.post(
  "/:influencer_id",
  authenticate,
  InfluencerReviewController.createReviewForInfluencer
);

/**
 * @route   PUT /api/influencers/:influencer_id/reviews
 * @desc    Update an existing review by the same user for the influencer
 * @access  Protected
 * @body    {
 *            rating: number (1-5) - required,
 *            comment: string - required
 *          }
 */
influencerReviewRoutes.put(
  "/:influencer_id",
  authenticate,
  InfluencerReviewController.updateInfluencerReview
);

export default influencerReviewRoutes;
