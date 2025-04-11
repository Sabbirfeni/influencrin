import express from "express";
import * as InfluencerController from "../controllers/influencer-controller";
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

export default influencerRoutes;
