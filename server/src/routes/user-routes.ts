import express from "express";
import * as userController from "../controllers/user-controller";
import authenticate from "../middleware/authenticate";

const userRoutes = express.Router();

userRoutes.get("/me", authenticate, userController.getMe);

export default userRoutes;
