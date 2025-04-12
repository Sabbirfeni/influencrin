import express from "express";
import authRoutes from "./auth-routes";
import userRoutes from "./user-routes";
import influencerRoutes from "./influencer-routes";
import influencerSocialPlatformRoutes from "./influencer-social-platform-routes";

const routes = express.Router();

// This order is importan. Route might not work if you change order.
routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use("/influencers/social-platforms", influencerSocialPlatformRoutes);
routes.use("/influencers", influencerRoutes);
export default routes;
