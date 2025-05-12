import express from "express";
import * as InfluencerAddRequestController from "../controllers/influencer-add-request-controller";

const influencerAddRequestRoutes = express.Router();

influencerAddRequestRoutes.post(
  "/",
  InfluencerAddRequestController.createInfluencerAddRequest
);

influencerAddRequestRoutes.get(
  "/count",
  InfluencerAddRequestController.getInfluencerAddRequestCount
);

export default influencerAddRequestRoutes;
