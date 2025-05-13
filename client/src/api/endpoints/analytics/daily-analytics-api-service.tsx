import axios from "../../axios";

// New type for daily visitors/searches chart
export interface DailyChartDataResponse {
  message: string;
  chartData: {
    date: string;
    visitors: number;
    searches: number;
  }[];
}

const dailyAnalyticsApiService = {
  getDailyVisitorsAndSearches: async (): Promise<DailyChartDataResponse> => {
    const res = await axios.get<DailyChartDataResponse>(
      "/analytics/daily-visitors-searches"
    );
    return res.data;
  },
};

export default dailyAnalyticsApiService;
