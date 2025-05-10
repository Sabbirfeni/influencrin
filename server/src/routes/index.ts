import express from "express";
import authRoutes from "./auth-routes";
import userRoutes from "./user-routes";
import influencerRoutes from "./influencer-routes";
import influencerSocialPlatformRoutes from "./influencer-social-platform-routes";
import influencerCategoryRoutes from "./influencer-category-routes";
import influencerReviewRoutes from "./influencer-review-routes";
import influencerAddRequestRoutes from "./influencer-add-request-routes";
import { trackVisitor } from "../controllers/site-visitor-controller";

const routes = express.Router();

// This order is importan. Route might not work if you change order.
routes.post("/track-visitor", trackVisitor);
routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use("/influencers/social-platforms", influencerSocialPlatformRoutes);
routes.use("/influencers/categories", influencerCategoryRoutes);
routes.use("/influencers/reviews", influencerReviewRoutes);
routes.use("/influencers", influencerRoutes);
routes.use("/influencer-add-request", influencerAddRequestRoutes);
export default routes;
