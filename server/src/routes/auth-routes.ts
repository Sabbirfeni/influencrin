// Import necessary modules and the auth controller
import express from "express";
import * as authController from "../controllers/auth-controller";
import authenticate from "../middleware/authenticate";

const authRoutes = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 * @body    { fullname: string, email: string, password: string }
 */
authRoutes.post("/register", authController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Log in an existing user
 * @access  Public
 * @body    { email: string, password: string }
 */
authRoutes.post("/login", authController.login);

/**
 * @route   POST /api/auth/logout
 * @desc    Log out the currently authenticated user
 * @access  Private (Requires authentication)
 */
authRoutes.post("/logout", authenticate, authController.logout);

export default authRoutes;
