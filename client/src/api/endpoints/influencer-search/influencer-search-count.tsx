import axios from "../../axios";

type InfluencerSearchCountResponse = {
  message: string;
  count: number;
};

const InfluencerSearchCountApiServices = {
  // Fetch current search count
  getInfluencerSearchCount: async (): Promise<number> => {
    const res = await axios.get<InfluencerSearchCountResponse>(
      "/influencers/search/count"
    );
    return res.data.count;
  },

  // Increment search count
  incrementInfluencerSearchCount: async (): Promise<number> => {
    const res = await axios.post<InfluencerSearchCountResponse>(
      "/influencers/search/count"
    );
    return res.data.count;
  },
};

export default InfluencerSearchCountApiServices;
