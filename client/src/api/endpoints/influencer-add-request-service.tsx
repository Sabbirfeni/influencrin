import axios from "../axios";

// Types
interface InfluencerAddRequestData {
  platform_profile_link: string;
  email?: string;
}

// Influencer Add Request API Service
const influencerAddRequestApiService = {
  // Submit a new influencer add request
  requestToAddInfluencer: async (data: InfluencerAddRequestData) => {
    const res = await axios.post("/influencer-add-request", data);
    return res.data;
  },
};

export default influencerAddRequestApiService;
