import express from "express";
import * as CountsAnalyticsController from "../../controllers/analytics/counts-analytics-controller";
import * as DailyVisitorsSearches from "../../controllers/analytics/daily-analytics-controller";

const analyticsRoutes = express.Router();

analyticsRoutes.get("/counts", CountsAnalyticsController.getCountsAnalytics);
analyticsRoutes.get(
  "/daily-visitors-searches",
  DailyVisitorsSearches.getDailyVisitorsSearches
);

export default analyticsRoutes;
