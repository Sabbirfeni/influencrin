import express from "express";
import authRoutes from "./auth-routes";
import userRoutes from "./user-routes";
import influencerRoutes from "./influencer-routes";

const routes = express.Router();

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use("/influencers", influencerRoutes);

export default routes;
