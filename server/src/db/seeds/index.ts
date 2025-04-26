import InfluencerCategory from "../../models/influencer-category-model";
import Influencer from "../../models/influencer-model";
import InfluencerSocialPlatform from "../../models/influencer-social-platform-model";
import User from "../../models/user-model";
import { sequelize } from "../sequelize";
import { seedInfluencerSocialPlatforms } from "./influencer-social-platforms-seed";
import { seedInfluencersFromRealUsers } from "./influencers-seed";

import { seedUsers } from "./seed-users";

async function runSeeds() {
  try {
    // await User.sync({ alter: true });
    // await Influencer.sync({ alter: true });
    // await InfluencerSocialPlatform.sync({ alter: true });
    // await InfluencerCategory.sync({ alter: true }); // Drop & recreate tables
    console.log("Database synced.");

    // await seedUsers(10);
    // await seedInfluencersFromRealUsers();
    // await seedSocialMediaPlatforms();
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    // await sequelize.close();
  }
}

export default runSeeds;
