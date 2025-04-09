import User from "./user.js";
import Influencer from "./influencer.js";
import InfluencerPlatform from "./influencerPlatform.js";
import Review from "./review.js";
import SocialMediaPlatform from "./socialMediaPlatform.js";

// Import and run associations
import { associateModels } from "./associateModels.js";

associateModels();

const models = {
  User,
  Influencer,
  InfluencerPlatform,
  Review,
  SocialMediaPlatform,
};

export default models;
