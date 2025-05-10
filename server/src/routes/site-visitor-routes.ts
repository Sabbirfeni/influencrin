import express from "express";
import * as SiteVisitorController from "../controllers/site-visitor-controller";

const siteVisitorRoutes = express.Router();

siteVisitorRoutes.get("/", SiteVisitorController.getVisitorCount);
siteVisitorRoutes.post("/", SiteVisitorController.trackVisitor);

export default siteVisitorRoutes;
