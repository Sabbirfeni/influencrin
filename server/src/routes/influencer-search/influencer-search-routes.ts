import express from "express";
import * as InfluencerController from "../../controllers/influencer-controller";
import * as InfluencerSearchCountController from "../../controllers/influencer-search/influencer-search-count-controller";

const influencerSearchRoutes = express.Router();

influencerSearchRoutes.get("/", InfluencerController.searchInfluencers);
influencerSearchRoutes.get(
  "/count",
  InfluencerSearchCountController.getInfluencerSearchCount
);
influencerSearchRoutes.post(
  "/count",
  InfluencerSearchCountController.incrementInfluencerSearchCount
);

export default influencerSearchRoutes;
