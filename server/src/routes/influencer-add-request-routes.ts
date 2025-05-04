import express from "express";
import * as InfluencerAddRequestController from "../controllers/influencer-add-request-controller";

const influencerAddRequestRoutes = express.Router();

influencerAddRequestRoutes.post(
  "/",
  InfluencerAddRequestController.createInfluencerAddRequest
);

export default influencerAddRequestRoutes;
