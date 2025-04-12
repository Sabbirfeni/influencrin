// Import necessary modules and the auth controller
import express from "express";
import * as authController from "../controllers/auth-controller";
import authenticate from "../middleware/authenticate";

const authRoutes = express.Router();

/**
 * Public route - Register a new user
 * POST /api/auth/register
 * Body: { name, email, password, ... }
 */
authRoutes.post("/register", authController.register);

/**
 * Public route - Log in an existing user
 * POST /api/auth/login
 * Body: { email, password }
 */
authRoutes.post("/login", authController.login);

/**
 * Public or Protected route (depending on your implementation) - Log out the user
 * POST /api/auth/logout
 */
authRoutes.post("/logout", authenticate, authController.logout);

export default authRoutes;
