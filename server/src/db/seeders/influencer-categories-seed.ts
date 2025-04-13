import InfluencerCategory from "../../models/influencer-category-model";
import { sequelize } from "../sequelize";

const influencerCategoriesData = [
  // Sarah Johnson (Travel/Food)
  {
    influencer_id: "62915cb9-d1ef-40f7-a6b5-fd0a75493afc",
    category_name: "Travel",
  },
  {
    influencer_id: "62915cb9-d1ef-40f7-a6b5-fd0a75493afc",
    category_name: "Food",
  },

  // Michael Chen (Tech/Gadgets)
  {
    influencer_id: "9f25491f-b670-47b8-a2ca-7371d31999bd",
    category_name: "Technology",
  },
  {
    influencer_id: "9f25491f-b670-47b8-a2ca-7371d31999bd",
    category_name: "Gadgets",
  },

  // Emma Wilson (Fitness/Wellness)
  {
    influencer_id: "dbc9bcac-a359-4be9-bb0c-0432c6b0bc48",
    category_name: "Fitness",
  },
  {
    influencer_id: "dbc9bcac-a359-4be9-bb0c-0432c6b0bc48",
    category_name: "Wellness",
  },

  // David Rodriguez (Photography/Art)
  {
    influencer_id: "c0bcafe1-ad7c-4d40-a95d-30210d471360",
    category_name: "Photography",
  },
  {
    influencer_id: "c0bcafe1-ad7c-4d40-a95d-30210d471360",
    category_name: "Art",
  },

  // Olivia Martinez (Fashion/Lifestyle)
  {
    influencer_id: "22f334ee-e5c1-4563-9e02-892dcbab5167",
    category_name: "Fashion",
  },
  {
    influencer_id: "22f334ee-e5c1-4563-9e02-892dcbab5167",
    category_name: "Lifestyle",
  },

  // James Wilson (Finance/Investing)
  {
    influencer_id: "c0793546-18a4-47c9-a447-4039b9ffcffc",
    category_name: "Finance",
  },
  {
    influencer_id: "c0793546-18a4-47c9-a447-4039b9ffcffc",
    category_name: "Investing",
  },

  // Sophia Lee (Food/Vegan)
  {
    influencer_id: "0138461d-8199-4fd9-b338-6d43e13c4abf",
    category_name: "Food",
  },
  {
    influencer_id: "0138461d-8199-4fd9-b338-6d43e13c4abf",
    category_name: "Vegan",
  },

  // Daniel Brown (Travel/Adventure)
  {
    influencer_id: "d1f3c2df-7121-4c3d-a613-e9d87f883e2e",
    category_name: "Travel",
  },
  {
    influencer_id: "d1f3c2df-7121-4c3d-a613-e9d87f883e2e",
    category_name: "Adventure",
  },

  // Ava Garcia (Beauty/Makeup)
  {
    influencer_id: "25f900e7-3091-4c57-bf8d-0dddb86a34d5",
    category_name: "Beauty",
  },
  {
    influencer_id: "25f900e7-3091-4c57-bf8d-0dddb86a34d5",
    category_name: "Makeup",
  },

  // Ethan Moore (Lifestyle/Productivity)
  {
    influencer_id: "057d2599-cf59-46fb-aad5-1cd129388d4c",
    category_name: "Lifestyle",
  },
  {
    influencer_id: "057d2599-cf59-46fb-aad5-1cd129388d4c",
    category_name: "Productivity",
  },

  // Mia Thompson (Parenting/Family)
  {
    influencer_id: "b9f5dfe8-9260-461e-9e37-b2f035a43f85",
    category_name: "Parenting",
  },
  {
    influencer_id: "b9f5dfe8-9260-461e-9e37-b2f035a43f85",
    category_name: "Family",
  },

  // Noah Anderson (DIY/Home Improvement)
  {
    influencer_id: "fb24fc91-c6a7-4300-acbc-6ef7769f5a09",
    category_name: "DIY",
  },
  {
    influencer_id: "fb24fc91-c6a7-4300-acbc-6ef7769f5a09",
    category_name: "Home Improvement",
  },

  // Isabella Clark (Sustainability/Eco-Friendly)
  {
    influencer_id: "1d795213-8474-4b4a-bd20-224223eaca33",
    category_name: "Sustainability",
  },
  {
    influencer_id: "1d795213-8474-4b4a-bd20-224223eaca33",
    category_name: "Eco-Friendly",
  },

  // Liam White (Music/Entertainment)
  {
    influencer_id: "738ae5f0-e889-42d4-b32f-0b1ca4dfdc31",
    category_name: "Music",
  },
  {
    influencer_id: "738ae5f0-e889-42d4-b32f-0b1ca4dfdc31",
    category_name: "Entertainment",
  },

  // Charlotte Hall (Books/Literature)
  {
    influencer_id: "7b36a323-f9e1-427c-a3b8-6b12ec0e14f3",
    category_name: "Books",
  },
  {
    influencer_id: "7b36a323-f9e1-427c-a3b8-6b12ec0e14f3",
    category_name: "Literature",
  },

  // Benjamin Young (Automotive/Cars)
  {
    influencer_id: "19d7b423-90cb-414d-9f61-bdc4789429e1",
    category_name: "Automotive",
  },
  {
    influencer_id: "19d7b423-90cb-414d-9f61-bdc4789429e1",
    category_name: "Cars",
  },

  // Amelia King (Yoga/Wellness)
  {
    influencer_id: "82c5339e-c5d4-4097-9aaf-c951877d6054",
    category_name: "Yoga",
  },
  {
    influencer_id: "82c5339e-c5d4-4097-9aaf-c951877d6054",
    category_name: "Wellness",
  },

  // Lucas Scott (Gaming/Esports)
  {
    influencer_id: "071627d8-1e65-4ff7-9ba9-430b8f044c64",
    category_name: "Gaming",
  },
  {
    influencer_id: "071627d8-1e65-4ff7-9ba9-430b8f044c64",
    category_name: "Esports",
  },

  // Harper Adams (Art/Culture)
  {
    influencer_id: "02c7c4b8-e25d-4fe9-ad06-8eedef7d45fe",
    category_name: "Art",
  },
  {
    influencer_id: "02c7c4b8-e25d-4fe9-ad06-8eedef7d45fe",
    category_name: "Culture",
  },

  // Henry Baker (Food/Cooking)
  {
    influencer_id: "50cfcdd7-6e1e-44f5-8c36-3ca249952fe1",
    category_name: "Food",
  },
  {
    influencer_id: "50cfcdd7-6e1e-44f5-8c36-3ca249952fe1",
    category_name: "Cooking",
  },
];

export const seedInfluencerCategories = async () => {
  try {
    // Check if categories already exist
    const count = await InfluencerCategory.count();
    if (count > 0) {
      console.log("Influencer categories already exist in database");
      return;
    }

    // Create all categories in a transaction
    await sequelize.transaction(async (transaction) => {
      await InfluencerCategory.bulkCreate(influencerCategoriesData, {
        transaction,
      });
    });

    console.log("✅ Influencer categories seeded successfully");
  } catch (error) {
    console.error("❌ Failed to seed influencer categories:", error);
    throw error;
  }
};
