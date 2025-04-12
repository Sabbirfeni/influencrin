import express from "express";
import authRoutes from "./auth-routes";
import userRoutes from "./user-routes";
import influencerRoutes from "./influencer-routes";
import influencerSocialPlatformRoutes from "./influencer-social-platform-routes";

const routes = express.Router();

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use("/influencers", influencerRoutes);
routes.use("/influencers/social-platforms", influencerSocialPlatformRoutes);
export default routes;
