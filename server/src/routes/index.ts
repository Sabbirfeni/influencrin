import express from "express";
import authRoutes from "./auth-routes";
import userRoutes from "./user-routes";
import influencerRoutes from "./influencer-routes";
import influencerSocialPlatformRoutes from "./influencer-social-platform-routes";
import influencerCategoryRoutes from "./influencer-category-routes";
import influencerReviewRoutes from "./influencer-review-routes";
import influencerAddRequestRoutes from "./influencer-add-request-routes";
import siteVisitorRoutes from "./site-visitor-routes";
import influencerSearchRoutes from "./influencer-search/influencer-search-routes";
import analyticsRoutes from "./analytics/analytics-route";

const routes = express.Router();

// This order is importan. Route might not work if you change order.
routes.use("/track-visitor", siteVisitorRoutes);
routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use("/influencers/social-platforms", influencerSocialPlatformRoutes);
routes.use("/influencers/categories", influencerCategoryRoutes);
routes.use("/influencers/reviews", influencerReviewRoutes);
routes.use("/influencers/search", influencerSearchRoutes);
routes.use("/influencers", influencerRoutes);
routes.use("/influencer-add-request", influencerAddRequestRoutes);
routes.use("/analytics", analyticsRoutes);
export default routes;
