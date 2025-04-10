import User from "./user-model";
import Influencer from "./influencer-model";
import InfluencerPlatform from "./influencer-social-platform-model";
import Review from "./review-model";
import SocialMediaPlatform from "./social-media-platform-model";

// Import and run associations
import { associateModels } from "./associate-models";
associateModels();

const models = {
  User,
  Influencer,
  InfluencerPlatform,
  Review,
  SocialMediaPlatform,
};

export default models;
