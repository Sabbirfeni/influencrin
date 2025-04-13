import InfluencerSocialPlatform from "../../models/influencer-social-platform-model";
import { sequelize } from "../sequelize";

const influencerSocialPlatformsData = [
  {
    influencer_id: "c0793546-18a4-47c9-a447-4039b9ffcffc",
    platform_id: "fb8d99e5-4f71-4f88-bf4b-53410cddbc53", // Snapchat
    follower_count: 650000,
    platform_profile_link: "https://snapchat.com/influencer20",
  },
  {
    influencer_id: "62915cb9-d1ef-40f7-a6b5-fd0a75493afc",
    platform_id: "bba9e74f-5716-4dbb-a56d-1a09c9332f01", // Instagram
    follower_count: 500000,
    platform_profile_link: "https://instagram.com/influencer1",
  },
  {
    influencer_id: "62915cb9-d1ef-40f7-a6b5-fd0a75493afc",
    platform_id: "e213f5b7-d36b-44f5-a51a-bd46d9ecb3df", // Facebook
    follower_count: 300000,
    platform_profile_link: "https://facebook.com/influencer1",
  },
  {
    influencer_id: "9f25491f-b670-47b8-a2ca-7371d31999bd",
    platform_id: "f0d7e7b8-6f04-4a0c-9a94-2faaf110292f", // Twitter
    follower_count: 1200000,
    platform_profile_link: "https://twitter.com/influencer2",
  },
  {
    influencer_id: "9f25491f-b670-47b8-a2ca-7371d31999bd",
    platform_id: "a05d3cd4-f254-4d09-8774-cd18733f9c7e", // TikTok
    follower_count: 900000,
    platform_profile_link: "https://tiktok.com/influencer2",
  },
  {
    influencer_id: "dbc9bcac-a359-4be9-bb0c-0432c6b0bc48",
    platform_id: "c9f3f1db-5bcb-4c44-9b92-02fd7157dc9d", // YouTube
    follower_count: 800000,
    platform_profile_link: "https://youtube.com/influencer3",
  },
  {
    influencer_id: "dbc9bcac-a359-4be9-bb0c-0432c6b0bc48",
    platform_id: "fa4ec1a2-8397-4f03-aaf2-5f58096a6fdf", // LinkedIn
    follower_count: 150000,
    platform_profile_link: "https://linkedin.com/influencer3",
  },
  {
    influencer_id: "c0bcafe1-ad7c-4d40-a95d-30210d471360",
    platform_id: "fb8d99e5-4f71-4f88-bf4b-53410cddbc53", // Snapchat
    follower_count: 400000,
    platform_profile_link: "https://snapchat.com/influencer4",
  },
  {
    influencer_id: "c0bcafe1-ad7c-4d40-a95d-30210d471360",
    platform_id: "56f15e2e-d5f0-40f3-910e-cb85d6b2d738", // Pinterest
    follower_count: 200000,
    platform_profile_link: "https://pinterest.com/influencer4",
  },
  {
    influencer_id: "22f334ee-e5c1-4563-9e02-892dcbab5167",
    platform_id: "a0e5cd21-c6ff-45d4-a299-c087e2417d25", // Reddit
    follower_count: 600000,
    platform_profile_link: "https://reddit.com/influencer5",
  },
  {
    influencer_id: "22f334ee-e5c1-4563-9e02-892dcbab5167",
    platform_id: "694a897f-7d10-4071-baf1-1088aef51c69", // Twitch
    follower_count: 700000,
    platform_profile_link: "https://twitch.com/influencer5",
  },
  {
    influencer_id: "0138461d-8199-4fd9-b338-6d43e13c4abf",
    platform_id: "fa4ec1a2-8397-4f03-aaf2-5f58096a6fdf", // LinkedIn
    follower_count: 550000,
    platform_profile_link: "https://linkedin.com/influencer6",
  },
  {
    influencer_id: "d1f3c2df-7121-4c3d-a613-e9d87f883e2e",
    platform_id: "bba9e74f-5716-4dbb-a56d-1a09c9332f01", // Instagram
    follower_count: 900000,
    platform_profile_link: "https://instagram.com/influencer7",
  },
  {
    influencer_id: "25f900e7-3091-4c57-bf8d-0dddb86a34d5",
    platform_id: "36e05b3c-e1b7-4e0f-9c58-289c38ee8c2b", // Clubhouse
    follower_count: 100000,
    platform_profile_link: "https://clubhouse.com/influencer8",
  },
  {
    influencer_id: "057d2599-cf59-46fb-aad5-1cd129388d4c",
    platform_id: "694a897f-7d10-4071-baf1-1088aef51c69", // Twitch
    follower_count: 450000,
    platform_profile_link: "https://twitch.com/influencer9",
  },
  {
    influencer_id: "b9f5dfe8-9260-461e-9e37-b2f035a43f85",
    platform_id: "e213f5b7-d36b-44f5-a51a-bd46d9ecb3df", // Facebook
    follower_count: 200000,
    platform_profile_link: "https://facebook.com/influencer10",
  },
  {
    influencer_id: "fb24fc91-c6a7-4300-acbc-6ef7769f5a09",
    platform_id: "a05d3cd4-f254-4d09-8774-cd18733f9c7e", // TikTok
    follower_count: 700000,
    platform_profile_link: "https://tiktok.com/influencer11",
  },
  {
    influencer_id: "1d795213-8474-4b4a-bd20-224223eaca33",
    platform_id: "c9f3f1db-5bcb-4c44-9b92-02fd7157dc9d", // YouTube
    follower_count: 550000,
    platform_profile_link: "https://youtube.com/influencer12",
  },
  {
    influencer_id: "738ae5f0-e889-42d4-b32f-0b1ca4dfdc31",
    platform_id: "56f15e2e-d5f0-40f3-910e-cb85d6b2d738", // Pinterest
    follower_count: 450000,
    platform_profile_link: "https://pinterest.com/influencer13",
  },
  {
    influencer_id: "7b36a323-f9e1-427c-a3b8-6b12ec0e14f3",
    platform_id: "a9cefc95-4416-41ad-b20a-6bbdff62d18f", // Quora
    follower_count: 300000,
    platform_profile_link: "https://quora.com/influencer14",
  },
  {
    influencer_id: "19d7b423-90cb-414d-9f61-bdc4789429e1",
    platform_id: "a0e5cd21-c6ff-45d4-a299-c087e2417d25", // Reddit
    follower_count: 250000,
    platform_profile_link: "https://reddit.com/influencer15",
  },
  {
    influencer_id: "82c5339e-c5d4-4097-9aaf-c951877d6054",
    platform_id: "694a897f-7d10-4071-baf1-1088aef51c69", // Twitch
    follower_count: 600000,
    platform_profile_link: "https://twitch.com/influencer16",
  },
  {
    influencer_id: "071627d8-1e65-4ff7-9ba9-430b8f044c64",
    platform_id: "a05d3cd4-f254-4d09-8774-cd18733f9c7e", // TikTok
    follower_count: 350000,
    platform_profile_link: "https://tiktok.com/influencer17",
  },
  {
    influencer_id: "02c7c4b8-e25d-4fe9-ad06-8eedef7d45fe",
    platform_id: "bba9e74f-5716-4dbb-a56d-1a09c9332f01", // Instagram
    follower_count: 900000,
    platform_profile_link: "https://instagram.com/influencer18",
  },
  {
    influencer_id: "50cfcdd7-6e1e-44f5-8c36-3ca249952fe1",
    platform_id: "bba9e74f-5716-4dbb-a56d-1a09c9332f01", // Instagram
    follower_count: 1000000,
    platform_profile_link: "https://instagram.com/influencer19",
  },
];

// const socialMediaPlatformIds = [
//     "bba9e74f-5716-4dbb-a56d-1a09c9332f01", // Instagram
//     "e213f5b7-d36b-44f5-a51a-bd46d9ecb3df", // Facebook
//     "f0d7e7b8-6f04-4a0c-9a94-2faaf110292f", // Twitter
//     "a05d3cd4-f254-4d09-8774-cd18733f9c7e", // TikTok
//     "c9f3f1db-5bcb-4c44-9b92-02fd7157dc9d", // YouTube
//     "fa4ec1a2-8397-4f03-aaf2-5f58096a6fdf", // LinkedIn
//     "fb8d99e5-4f71-4f88-bf4b-53410cddbc53", // Snapchat
//     "56f15e2e-d5f0-40f3-910e-cb85d6b2d738", // Pinterest
//     "a0e5cd21-c6ff-45d4-a299-c087e2417d25", // Reddit
//     "694a897f-7d10-4071-baf1-1088aef51c69", // Twitch
//     "ae2b1e11-1625-429f-8109-351267d4cc8f", // Telegram
//     "ac3a1ee2-8eeb-472b-aafe-782bc9284a58", // WhatsApp
//     "1d6815e0-c241-46bb-b8b9-548c5206ae51", // Threads
//     "d0171868-cb1d-4a9d-ae3d-11ec3e9ae582", // WeChat
//     "37cf96cd-5e60-4174-8673-1a5e316fdc92", // LINE
//     "56ba64e0-0733-4e3e-a9c4-e3149f397c25", // VK
//     "9bff95b9-5b75-4a46-ae62-4c6cb9e1e70e", // Douyin
//     "a9cefc95-4416-41ad-b20a-6bbdff62d18f", // Quora
//     "36e05b3c-e1b7-4e0f-9c58-289c38ee8c2b", // Clubhouse
//     "129a7a30-f11a-4d88-83f4-002eebfcb52f"  // Tumblr
//   ];

export const seedInfluencerSocialPlatforms = async () => {
  try {
    // Check if influencers already exist
    const count = await InfluencerSocialPlatform.count();
    if (count > 0) {
      console.log("Influencers already exist in database");
      return;
    }

    // Create all influencers in a transaction
    await sequelize.transaction(async (transaction) => {
      await InfluencerSocialPlatform.bulkCreate(influencerSocialPlatformsData, {
        transaction,
      });
    });

    console.log("✅ Influencer social platforms seeded successfully");
  } catch (error) {
    console.error("❌ Failed to seed Influencer social platforms:", error);
    throw error;
  }
};
