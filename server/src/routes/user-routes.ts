// Import necessary modules and the user controller
import express from "express";
import * as userController from "../controllers/user-controller";
import authenticate from "../middleware/authenticate";

const userRoutes = express.Router();

/**
 * Protected route - Get the currently authenticated user's information
 * GET /api/users/me
 * Requires a valid authentication token (middleware: authenticate)
 */
userRoutes.get("/me", authenticate, userController.getMe);

export default userRoutes;
