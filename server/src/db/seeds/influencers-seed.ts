import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../sequelize";
import { ESClient } from "../elastic-search-connection";
import Influencer from "../../models/influencer-model";
import InfluencerSocialPlatform from "../../models/influencer-social-platform-model";
import InfluencerCategory from "../../models/influencer-category-model";
import InfluencerReview from "../../models/influencer-review-model";
import User from "../../models/user-model";
import SocialMediaPlatform from "../../models/social-media-platform-model";
import { InfluencerSocialPlatformCreationAttributes } from "../../types/influencer-social-platform";

function generateUniqueHandle(): string {
  return faker.internet.username() + "-" + uuidv4();
}

function generateUniqueProfileLink(platformId: string): string {
  return faker.internet.url() + "/profile/" + platformId + "-" + uuidv4();
}

export async function seedInfluencersFromRealUsers(): Promise<void> {
  console.log(`🔵 Seeding influencers from real users...`);
  const startTime = process.hrtime.bigint();
  const transaction = await sequelize.transaction();

  // Track how many influencers were created so far
  let createdInfluencers = 0;
  let lastLoggedInfluencers = 0;
  let timer: NodeJS.Timeout | undefined;

  try {
    const users = await User.findAll({ transaction });
    const platforms = await SocialMediaPlatform.findAll({ transaction });

    if (users.length === 0 || platforms.length === 0) {
      console.error("❌ No users or platforms found. Seed them first!");
      await transaction.rollback();
      return;
    }

    // Start a timer to log every 1 second
    timer = setInterval(() => {
      const now = Date.now();
      console.log(
        `⏱️ [${((now - Number(startTime) / 1_000_000) / 1000).toFixed(
          1
        )}s] Influencers created: ${createdInfluencers} (+${
          createdInfluencers - lastLoggedInfluencers
        } in last 10s)`
      );
      lastLoggedInfluencers = createdInfluencers;
    }, 10000);

    const totalInfluencers = 500;
    const userCount = users.length;

    let influencersPerUser = Array(userCount).fill(45);
    let remainingInfluencers = totalInfluencers - 45 * userCount;

    while (remainingInfluencers > 0) {
      const randomIndex = faker.number.int({ min: 0, max: userCount - 1 });
      if (influencersPerUser[randomIndex] < 10000) {
        influencersPerUser[randomIndex]++;
        remainingInfluencers--;
      }
    }

    for (let i = 0; i < userCount; i++) {
      const user = users[i];
      const userId = user.get("id") as string;
      const influencersForUser = influencersPerUser[i];

      for (let j = 0; j < influencersForUser; j++) {
        const handle = generateUniqueHandle();

        const influencer = await Influencer.create(
          {
            user_id: userId,
            fullname: user.get("fullname") as string,
            handle,
            bio: faker.lorem.paragraph(),
            location: faker.location.city(),
            profile_image: "default-profile.jpg",
          },
          { transaction }
        );

        const influencerId = influencer.get("id") as string;

        const influencerDoc = {
          user_id: userId,
          fullname: user.get("fullname") as string,
          handle,
          profile_image: "default-profile.jpg",
          bio: faker.lorem.paragraph(),
          location: faker.location.city(),
          social_profiles: [] as {
            platform_id: string;
            platform_profile_link: string;
            follower_count: number;
          }[],
          categories: [] as string[],
          reviews: [] as {
            review_id: string;
            user_id: string;
            rating: number;
            comment: string;
          }[],
        };

        const platformCount = faker.number.int({ min: 1, max: 3 });
        const randomPlatforms = faker.helpers.arrayElements(
          platforms,
          platformCount
        );

        const socialPlatforms: InfluencerSocialPlatformCreationAttributes[] =
          randomPlatforms.map((platform) => ({
            influencer_id: influencerId,
            platform_id: platform.get("id") as string,
            platform_profile_link: generateUniqueProfileLink(
              platform.get("id") as string
            ),
            follower_count: faker.number.int({ min: 100, max: 1_000_000 }),
          }));

        influencerDoc.social_profiles = socialPlatforms.map((sp) => ({
          platform_id: sp.platform_id,
          platform_profile_link: sp.platform_profile_link,
          follower_count: sp.follower_count ?? 0,
        }));

        const categoryCount = faker.number.int({ min: 1, max: 3 });
        const categoryNames = Array.from({ length: categoryCount }).map(() =>
          faker.word.noun()
        );

        const influencerCategories = categoryNames.map((name) => ({
          influencer_id: influencerId,
          category_name: name,
        }));

        influencerDoc.categories = categoryNames;

        const otherUsers = users.filter((u) => u.get("id") !== userId);
        const reviewCount = faker.number.int({ min: 1, max: 3 });

        const influencerReviews = Array.from({ length: reviewCount }).map(
          () => {
            const randomReviewer = faker.helpers.arrayElement(otherUsers);
            return {
              influencer_id: influencerId,
              review_id: uuidv4(),
              user_id: randomReviewer.get("id") as string,
              rating: faker.number.int({ min: 1, max: 5 }),
              comment: faker.lorem.sentences({ min: 1, max: 3 }),
            };
          }
        );

        influencerDoc.reviews = influencerReviews.map((review) => ({
          review_id: review.review_id,
          user_id: review.user_id,
          rating: review.rating,
          comment: review.comment,
        }));

        await ESClient.index({
          index: "influencers",
          id: influencerId,
          body: influencerDoc,
        });

        await Promise.all([
          InfluencerSocialPlatform.bulkCreate(socialPlatforms, { transaction }),
          InfluencerCategory.bulkCreate(influencerCategories, { transaction }),
          InfluencerReview.bulkCreate(influencerReviews, { transaction }),
        ]);

        createdInfluencers++;
      }
    }

    await transaction.commit();
    const endTime = process.hrtime.bigint();
    const timeElapsed = Number(endTime - startTime) / 1_000_000;

    console.log(
      `✅ Seeded ${createdInfluencers} influencers in ${timeElapsed.toFixed(
        2
      )}ms.`
    );
  } catch (error) {
    console.error("❌ Error seeding influencers:", error);
    await transaction.rollback();
  } finally {
    if (timer) {
      clearInterval(timer);
    }
  }
}
