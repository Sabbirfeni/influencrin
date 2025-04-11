import express from "express";
import * as InfluencerController from "../controllers/influencer-controller";
import * as InfluencerManagementController from "../controllers/influencer-management-controller";
import authenticate from "../middleware/authenticate";

const influencerRoutes = express.Router();

influencerRoutes.get("/", InfluencerController.getAllInfluencers);
influencerRoutes.get(
  "/me",
  authenticate,
  InfluencerController.getInfluencersByUser
);
influencerRoutes.get("/:handle", InfluencerController.getInfluencer);

influencerRoutes.post("/", authenticate, InfluencerController.createInfluencer);
influencerRoutes.put(
  "/:handle",
  authenticate,
  InfluencerManagementController.updateInfluencer
);
influencerRoutes.delete(
  "/:handle",
  authenticate,
  InfluencerManagementController.deleteInfluencer
);

export default influencerRoutes;
