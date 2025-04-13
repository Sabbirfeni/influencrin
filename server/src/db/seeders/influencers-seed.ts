import Influencer from "../../models/influencer-model";
import { sequelize } from "../sequelize";

const influencersData = [
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    fullname: "Sarah Johnson",
    handle: "sarahj",
    profile_image: "https://example.com/profiles/sarahj",
    bio: "Travel enthusiast and food lover exploring the world one bite at a time",
    location: "New York",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    fullname: "Michael Chen",
    handle: "mikechen",
    profile_image: "https://example.com/profiles/mikechen",
    bio: "Tech geek sharing the latest gadgets and software tips",
    location: "San Francisco",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    fullname: "Emma Wilson",
    handle: "emmaw",
    profile_image: "https://example.com/profiles/emmaw",
    bio: "Fitness coach helping people transform their lives through exercise",
    location: "London",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    fullname: "David Rodriguez",
    handle: "davidr",
    profile_image: "https://example.com/profiles/davidr",
    bio: "Professional photographer capturing life's beautiful moments",
    location: "Miami",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    fullname: "Olivia Martinez",
    handle: "oliviam",
    profile_image: "https://example.com/profiles/oliviam",
    bio: "Fashion influencer showcasing the latest trends and styles",
    location: "Paris",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    fullname: "James Wilson",
    handle: "jamesw",
    profile_image: "https://example.com/profiles/jamesw",
    bio: "Finance expert helping people make smart money decisions",
    location: "Chicago",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    fullname: "Sophia Lee",
    handle: "sophial",
    profile_image: "https://example.com/profiles/sophial",
    bio: "Vegan chef creating delicious plant-based recipes",
    location: "Los Angeles",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    fullname: "Daniel Brown",
    handle: "danielb",
    profile_image: "https://example.com/profiles/danielb",
    bio: "Adventure traveler documenting off-the-beaten-path destinations",
    location: "Denver",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    fullname: "Ava Garcia",
    handle: "avag",
    profile_image: "https://example.com/profiles/avag",
    bio: "Beauty influencer sharing makeup tutorials and skincare routines",
    location: "Toronto",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    fullname: "Ethan Moore",
    handle: "ethanm",
    profile_image: "https://example.com/profiles/ethanm",
    bio: "Minimalist lifestyle advocate and productivity coach",
    location: "Seattle",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    fullname: "Mia Thompson",
    handle: "miat",
    profile_image: "https://example.com/profiles/miat",
    bio: "Parenting blogger sharing tips for raising happy kids",
    location: "Austin",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    fullname: "Noah Anderson",
    handle: "noaha",
    profile_image: "https://example.com/profiles/noaha",
    bio: "DIY home improvement expert and woodworking enthusiast",
    location: "Portland",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    fullname: "Isabella Clark",
    handle: "isabellac",
    profile_image: "https://example.com/profiles/isabellac",
    bio: "Sustainable living advocate and zero waste practitioner",
    location: "Vancouver",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    fullname: "Liam White",
    handle: "liamw",
    profile_image: "https://example.com/profiles/liamw",
    bio: "Music producer sharing behind-the-scenes of song creation",
    location: "Nashville",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    fullname: "Charlotte Hall",
    handle: "charlotteh",
    profile_image: "https://example.com/profiles/charlotteh",
    bio: "Book reviewer and literary enthusiast",
    location: "Boston",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    fullname: "Benjamin Young",
    handle: "benjaminy",
    profile_image: "https://example.com/profiles/benjaminy",
    bio: "Car enthusiast reviewing the latest models and mods",
    location: "Detroit",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    fullname: "Amelia King",
    handle: "ameliak",
    profile_image: "https://example.com/profiles/ameliak",
    bio: "Yoga instructor promoting mindfulness and wellness",
    location: "Sedona",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    fullname: "Lucas Scott",
    handle: "lucass",
    profile_image: "https://example.com/profiles/lucass",
    bio: "Gaming streamer and esports commentator",
    location: "Las Vegas",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    fullname: "Harper Adams",
    handle: "harpera",
    profile_image: "https://example.com/profiles/harpera",
    bio: "Art curator showcasing emerging artists and exhibitions",
    location: "Berlin",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    fullname: "Henry Baker",
    handle: "henryb",
    profile_image: "https://example.com/profiles/henryb",
    bio: "Home chef specializing in gourmet cooking on a budget",
    location: "New Orleans",
  },
];

// 62915cb9-d1ef-40f7-a6b5-fd0a75493afc
// 9f25491f-b670-47b8-a2ca-7371d31999bd
// dbc9bcac-a359-4be9-bb0c-0432c6b0bc48
// c0bcafe1-ad7c-4d40-a95d-30210d471360
// 22f334ee-e5c1-4563-9e02-892dcbab5167
// c0793546-18a4-47c9-a447-4039b9ffcffc
// 0138461d-8199-4fd9-b338-6d43e13c4abf
// d1f3c2df-7121-4c3d-a613-e9d87f883e2e
// 25f900e7-3091-4c57-bf8d-0dddb86a34d5
// 057d2599-cf59-46fb-aad5-1cd129388d4c
// b9f5dfe8-9260-461e-9e37-b2f035a43f85
// fb24fc91-c6a7-4300-acbc-6ef7769f5a09
// 1d795213-8474-4b4a-bd20-224223eaca33
// 738ae5f0-e889-42d4-b32f-0b1ca4dfdc31
// 7b36a323-f9e1-427c-a3b8-6b12ec0e14f3
// 19d7b423-90cb-414d-9f61-bdc4789429e1
// 82c5339e-c5d4-4097-9aaf-c951877d6054
// 071627d8-1e65-4ff7-9ba9-430b8f044c64
// 02c7c4b8-e25d-4fe9-ad06-8eedef7d45fe
// 50cfcdd7-6e1e-44f5-8c36-3ca249952fe1

export const seedInfluencers = async () => {
  try {
    // Check if influencers already exist
    const count = await Influencer.count();
    if (count > 0) {
      console.log("Influencers already exist in database");
      return;
    }

    // Create all influencers in a transaction
    await sequelize.transaction(async (transaction) => {
      await Influencer.bulkCreate(influencersData, { transaction });
    });

    console.log("✅ Influencers seeded successfully");
  } catch (error) {
    console.error("❌ Failed to seed influencers:", error);
    throw error;
  }
};
