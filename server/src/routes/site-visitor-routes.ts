import express from "express";
import * as SiteVisitorController from "../controllers/site-visitor-controller";

const siteVisitorRoutes = express.Router();

siteVisitorRoutes.get("/count", SiteVisitorController.getVisitorCount);
siteVisitorRoutes.post("/", SiteVisitorController.trackVisitor);

export default siteVisitorRoutes;
