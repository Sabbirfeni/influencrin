import User from "./user-model.js";
import Influencer from "./influencer-model.js";
import InfluencerPlatform from "./influencer-platform-model.js";
import Review from "./review-model.js";
import SocialMediaPlatform from "./social-media-platform-model.js";

// Import and run associations
import { associateModels } from "./associate-models.js";
associateModels();

const models = {
  User,
  Influencer,
  InfluencerPlatform,
  Review,
  SocialMediaPlatform,
};

export default models;
