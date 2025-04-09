// models/associateModels.js
import Influencer from "./influencer.js";
import InfluencerPlatform from "./influencerPlatform.js";
import Review from "./review.js";
import User from "./user.js";

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
