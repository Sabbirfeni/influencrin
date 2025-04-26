import { faker } from "@faker-js/faker";
import Influencer from "../../models/influencer-model";
import InfluencerSocialPlatform from "../../models/influencer-social-platform-model";
import InfluencerCategory from "../../models/influencer-category-model";
import User from "../../models/user-model";
import SocialMediaPlatform from "../../models/social-media-platform-model";
import { sequelize } from "../sequelize";
import InfluencerReview from "../../models/influencer-review-model";

export async function seedInfluencersFromRealUsers(): Promise<void> {
  console.log(`🔵 Seeding influencers from real users...`);
  const startTime = process.hrtime.bigint();

  const transaction = await sequelize.transaction();
  try {
    // 1. Fetch all users
    const users = await User.findAll({ transaction });

    // 2. Fetch all platforms
    const platforms = await SocialMediaPlatform.findAll({ transaction });

    if (users.length === 0) {
      console.error("❌ No users found. Seed users first!");
      return;
    }

    if (platforms.length === 0) {
      console.error("❌ No platforms found. Seed platforms first!");
      return;
    }

    // Set total number of influencers to create
    const totalInfluencers = 100;
    const userCount = users.length;

    // Distribute the influencers smartly across users
    // Start by assigning each user a base number of influencers
    let influencersPerUser = Array(userCount).fill(3); // Default to 3 per user
    let remainingInfluencers = totalInfluencers - 3 * userCount;

    // Distribute remaining influencers randomly among users
    while (remainingInfluencers > 0) {
      const randomIndex = faker.number.int({ min: 0, max: userCount - 1 });
      if (influencersPerUser[randomIndex] < 10) {
        // Max 10 influencers per user
        influencersPerUser[randomIndex]++;
        remainingInfluencers--;
      }
    }

    // Now create influencers for each user based on the smart distribution
    let createdInfluencers = 0;
    for (let i = 0; i < userCount; i++) {
      const user = users[i];
      const userId = user.get("id") as string;
      const influencersForUser = influencersPerUser[i];

      for (let j = 0; j < influencersForUser; j++) {
        const influencer = await Influencer.create(
          {
            user_id: userId,
            fullname: user.get("fullname") as string,
            handle:
              faker.internet.userName() +
              faker.number.int({ min: 1, max: 9999 }),
            bio: faker.lorem.paragraph(),
            location: faker.location.city(),
            profile_image: "default-profile.jpg",
          },
          { transaction }
        );

        const influencerId = influencer.get("id") as string;

        // Pick random 1-3 platforms (no duplicates)
        const platformCount = faker.number.int({ min: 1, max: 3 });
        const randomPlatforms = faker.helpers.arrayElements(
          platforms,
          platformCount
        );

        const socialPlatforms = randomPlatforms.map((platform) => ({
          influencer_id: influencerId,
          platform_id: platform.get("id") as string, // ✅ real platform id
          follower_count: faker.number.int({ min: 100, max: 1000000 }),
          platform_profile_link: faker.internet.url(),
        }));

        await InfluencerSocialPlatform.bulkCreate(socialPlatforms, {
          transaction,
        });

        // 3. Create random categories (1-3)
        const categoryCount = faker.number.int({ min: 1, max: 3 });
        const categories = Array.from({ length: categoryCount }).map(() => ({
          influencer_id: influencerId,
          category_name: faker.word.noun(),
        }));

        await InfluencerCategory.bulkCreate(categories, { transaction });

        // 4. Create random reviews (1-3) from *other* users
        const reviewCount = faker.number.int({ min: 1, max: 3 });

        // Filter out the user who created the influencer
        const otherUsers = users.filter((u) => u.get("id") !== userId);

        if (otherUsers.length > 0) {
          const reviews = Array.from({ length: reviewCount }).map(() => {
            const randomReviewer = faker.helpers.arrayElement(otherUsers);
            const reviewerId = randomReviewer.get("id") as string;

            return {
              influencer_id: influencerId,
              user_id: reviewerId,
              rating: faker.number.int({ min: 1, max: 5 }),
              comment: faker.lorem.sentences({ min: 1, max: 3 }),
            };
          });

          await InfluencerReview.bulkCreate(reviews, { transaction });
        }

        createdInfluencers++;

        if (createdInfluencers >= totalInfluencers) {
          break;
        }
      }

      if (createdInfluencers >= totalInfluencers) {
        break;
      }
    }

    await transaction.commit();

    const endTime = process.hrtime.bigint();
    const durationSeconds = Number(endTime - startTime) / 1e9;
    const rate = (createdInfluencers / durationSeconds).toFixed(2);

    console.log(
      `✅ Seeded ${createdInfluencers} influencers in ${durationSeconds.toFixed(
        2
      )} seconds.`
    );
    console.log(`⚡ Speed: ${rate} influencers/second.`);
  } catch (error: any) {
    await transaction.rollback();
    console.error("❌ Failed to seed influencers:", error.message);
  }
}
