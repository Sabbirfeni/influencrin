import express from "express";
import * as authController from "../controllers/auth-controller.js";

const authRoutes = express.Router();

authRoutes.post("/register", authController.registerUser);

export default authRoutes;
