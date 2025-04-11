import User from "./user-model";
import Influencer from "./influencer-model";
import InfluencerPlatform from "./influencer-social-platform-model";
import Review from "./review-model";
import SocialMediaPlatform from "./social-media-platform-model";
import InfluencerCategory from "./influencer-category-model";

export function associateModels() {
  // Influencer and InfluencerPlatform relationship
  Influencer.hasMany(InfluencerPlatform, { foreignKey: "influencer_id" });
  InfluencerPlatform.belongsTo(Influencer, { foreignKey: "influencer_id" });

  // In social-media-platform-model.ts
  SocialMediaPlatform.hasMany(InfluencerPlatform, {
    foreignKey: "platform_id",
  });
  InfluencerPlatform.belongsTo(SocialMediaPlatform, {
    foreignKey: "platform_id",
  });

  // Review associations with User and Influencer
  Review.belongsTo(User, { foreignKey: "user_id" });
  Review.belongsTo(Influencer, { foreignKey: "influencer_id" });

  // If you want to add the reverse associations as well
  User.hasMany(Review, { foreignKey: "user_id" });
  Influencer.hasMany(Review, { foreignKey: "influencer_id" });

  Influencer.hasMany(InfluencerCategory, { foreignKey: "influencer_id" });
}
