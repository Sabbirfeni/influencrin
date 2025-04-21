import axios from "../axios";

// Define the structure of a single platform.
export interface SocialMediaPlatform {
  id: string;
  platform_name: string;
  platform_icon_url: string;
  domain_name: string;
}

// Define the structure of the API response.
export interface GetAllSocialMediaPlatformsResponse {
  message: string;
  socialMediaPlatforms: SocialMediaPlatform[];
}

// API service for fetching all social media platforms
const socialMediaPlatformApiServices = {
  getAllSocialMediaPlatforms:
    async (): Promise<GetAllSocialMediaPlatformsResponse> => {
      const res = await axios.get<GetAllSocialMediaPlatformsResponse>(
        "/influencers/social-platforms"
      );
      return res.data;
    },
};

export default socialMediaPlatformApiServices;
