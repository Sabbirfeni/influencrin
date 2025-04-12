// Import necessary modules and the user controller
import express from "express";
import * as userController from "../controllers/user-controller";
import authenticate from "../middleware/authenticate";

const userRoutes = express.Router();

/**
 * @route   GET /api/users/me
 * @desc    Get the currently authenticated user's information
 * @access  Private (Requires authentication)
 * @body    None
 */
userRoutes.get("/me", authenticate, userController.getMe);
userRoutes.get(
  "/:user_id/reviews",
  authenticate,
  userController.getReviewsByUser
);

export default userRoutes;
