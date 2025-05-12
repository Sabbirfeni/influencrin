// services/analyticsApiService.ts
import axios from "../../axios";

export interface AnalyticsCounts {
  message: string;
  counts: {
    visitorCount: number;
    influencerSearchCount: number;
    userCount: number;
    influencerAddRequestCount: number;
    influencerCount: number;
  };
}

const analyticsApiService = {
  getCounts: async (): Promise<AnalyticsCounts> => {
    const res = await axios.get<AnalyticsCounts>("/analytics/counts");
    return res.data;
  },
};

export { analyticsApiService };
