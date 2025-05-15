import axios from "../axios";

// Types
export interface SocialPlatform {
  platform: string;
  profileUrl: string;
  followers: number;
}

export interface InfluencerData {
  id: string;
  fullname: string;
  handle: string;
  bio: string;
  location: string;
  profileImage: string;
  socialPlatforms: SocialPlatform[];
  categories: string[];
  createdAt: string;
  updatedAt: string;
  message?: string | object | undefined;
}

export interface InfluencerFormInput {
  fullname: string;
  handle: string;
  bio: string;
  location: string;
  socialPlatforms: {
    platform: string;
    profileUrl: string;
    followers: number;
  }[];
  categories: string[];
  profileImage: File | string;
}

export interface SearchParams {
  q?: string;
  location?: string;
  categories?: string[];
  minFollowers?: number;
  maxFollowers?: number;
  page?: number;
  limit?: number;
}

const influencerApiService = {
  // Create a new influencer
  createInfluencer: async (formData: FormData): Promise<InfluencerData> => {
    const res = await axios.post("/influencers", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  // Get all influencers
  getAllInfluencers: async (): Promise<InfluencerData[]> => {
    const res = await axios.get("/influencers");
    return res.data;
  },

  // Search for influencers or get all influencers based on filters
  searchInfluencers: async (
    params?: SearchParams
  ): Promise<InfluencerData[]> => {
    const res = await axios.get("/influencers/search", { params });
    return res.data;
  },

  // Get a single influencer by handle
  getInfluencerByHandle: async (handle: string): Promise<InfluencerData> => {
    const res = await axios.get(`/influencers/${handle}`);
    return res.data;
  },

  // Get influencers created by a specific user
  getInfluencersByUser: async (): Promise<InfluencerData[]> => {
    const res = await axios.get("/influencers/me");
    return res.data;
  },

  // Get influencer locations
  getAllLocationsForInfluencers: async (): Promise<string[]> => {
    const res = await axios.get("/influencers/all-locations");
    return res.data;
  },
};

export default influencerApiService;
