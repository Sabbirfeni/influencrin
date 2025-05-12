import { Request, Response } from "express";
import InfluencerAddRequest from "../../models/influencer-add-request-model";
import InfluencerSearch from "../../models/influencer-search/influencer-search-model";
import Influencer from "../../models/influencer-model";
import SiteVisitor from "../../models/site-visitor-model";
import User from "../../models/user-model";

const getCountsAnalytics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const [
      influencerAddRequestCount,
      influencerSearchCount,
      influencerCount,
      visitorCount,
      userCount,
    ] = await Promise.all([
      InfluencerAddRequest.count(),
      InfluencerSearch.count(),
      Influencer.count(),
      SiteVisitor.count(),
      User.count(),
    ]);

    res.status(200).json({
      message: "Analytics counts retrieved successfully.",
      data: {
        visitorCount,
        influencerSearchCount,
        userCount,
        influencerAddRequestCount,
        influencerCount,
      },
    });
  } catch (error) {
    console.error("Error retrieving dashboard counts:", error);
    res.status(500).json({
      message: "Failed to retrieve dashboard counts.",
    });
  }
};

export { getCountsAnalytics };
