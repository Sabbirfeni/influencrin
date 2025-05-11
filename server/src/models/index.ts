import User from "./user-model";
import Influencer from "./influencer-model";
import InfluencerPlatform from "./influencer-social-platform-model";
import Review from "./influencer-review-model";
import SocialMediaPlatform from "./social-media-platform-model";
import InfluencerCategory from "./influencer-category-model";

// Import and run associations
import { associateModels } from "./associate-models";
import InfluencerAddRequest from "./influencer-add-request-model";
import SiteVisitor from "./site-visitor-model";
import InfluencerSearchCount from "./influencer-search/influencer-search-model";
associateModels();

const models = {
  User,
  Influencer,
  InfluencerPlatform,
  Review,
  SocialMediaPlatform,
  InfluencerCategory,
  InfluencerAddRequest,
  SiteVisitor,
  InfluencerSearchCount,
};

export default models;
