import User from "./user-model";
import Influencer from "./influencer-model";

import SocialMediaPlatform from "./social-media-platform-model";
import InfluencerCategory from "./influencer-category-model";
import InfluencerSocialPlatform from "./influencer-social-platform-model";
import InfluencerReview from "./influencer-review-model";

export function associateModels() {
  // Influencer and InfluencerPlatform relationship
  Influencer.hasMany(InfluencerSocialPlatform, { foreignKey: "influencer_id" });
  InfluencerSocialPlatform.belongsTo(Influencer, {
    foreignKey: "influencer_id",
  });

  // InfluencerSocialPlatform and SocialMediaPlatform relationship
  SocialMediaPlatform.hasMany(InfluencerSocialPlatform, {
    foreignKey: "platform_id",
  });
  InfluencerSocialPlatform.belongsTo(SocialMediaPlatform, {
    foreignKey: "platform_id",
  });

  // Influencer and InfluencerCategory relationship
  Influencer.hasMany(InfluencerCategory, { foreignKey: "influencer_id" });
  InfluencerCategory.belongsTo(Influencer, { foreignKey: "influencer_id" });

  // User and Review relationship
  InfluencerReview.belongsTo(User, { foreignKey: "user_id" });
  InfluencerReview.belongsTo(Influencer, { foreignKey: "influencer_id" });

  User.hasMany(InfluencerReview, { foreignKey: "user_id" });
  Influencer.hasMany(InfluencerReview, { foreignKey: "influencer_id" });
}
