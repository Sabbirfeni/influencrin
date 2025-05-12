import express from "express";
import * as CountsAnalyticsController from "../../controllers/analytics/counts-analytics-controller";

const analyticsRoutes = express.Router();

analyticsRoutes.get("/counts", CountsAnalyticsController.getCountsAnalytics);

export default analyticsRoutes;
