import User from "./user-model.js";
import Influencer from "./influencer-model.js";
import InfluencerPlatform from "./influencer-platform-model.js";
import Review from "./review-model.js";

export function associateModels() {
  // Influencer and InfluencerPlatform relationship
  Influencer.hasMany(InfluencerPlatform, { foreignKey: "influencer_id" });
  InfluencerPlatform.belongsTo(Influencer, { foreignKey: "influencer_id" });

  // Review associations with User and Influencer
  Review.belongsTo(User, { foreignKey: "user_id" });
  Review.belongsTo(Influencer, { foreignKey: "influencer_id" });

  // If you want to add the reverse associations as well
  User.hasMany(Review, { foreignKey: "user_id" });
  Influencer.hasMany(Review, { foreignKey: "influencer_id" });
}
