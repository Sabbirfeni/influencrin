import InfluencerReview from "../../models/influencer-review-model";
import { sequelize } from "../sequelize";

const reviewsData = [
  // Sarah Johnson (2 reviews)
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "62915cb9-d1ef-40f7-a6b5-fd0a75493afc",
    rating: 5,
    comment:
      "Sarah's travel tips completely transformed my vacation experience! Her food recommendations were spot on.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "62915cb9-d1ef-40f7-a6b5-fd0a75493afc",
    rating: 4,
    comment:
      "Great content overall, though I wish she posted more frequently about budget travel options.",
  },

  // Michael Chen (3 reviews)
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "9f25491f-b670-47b8-a2ca-7371d31999bd",
    rating: 5,
    comment:
      "Michael's tech reviews are the most thorough and unbiased I've found. Saved me from several bad purchases!",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "9f25491f-b670-47b8-a2ca-7371d31999bd",
    rating: 5,
    comment:
      "The software tutorials are incredibly helpful for beginners. Clear explanations and practical examples.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "9f25491f-b670-47b8-a2ca-7371d31999bd",
    rating: 4,
    comment:
      "Would love to see more content about emerging technologies, but overall excellent quality.",
  },

  // Emma Wilson (2 reviews)
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "dbc9bcac-a359-4be9-bb0c-0432c6b0bc48",
    rating: 5,
    comment:
      "Emma's fitness program helped me lose 20 pounds in 3 months. Life-changing!",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "dbc9bcac-a359-4be9-bb0c-0432c6b0bc48",
    rating: 4,
    comment:
      "Great workouts, though some moves are challenging for absolute beginners.",
  },

  // David Rodriguez (3 reviews)
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "c0bcafe1-ad7c-4d40-a95d-30210d471360",
    rating: 5,
    comment:
      "David's photography tutorials improved my skills dramatically. His composition tips are gold.",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "c0bcafe1-ad7c-4d40-a95d-30210d471360",
    rating: 5,
    comment:
      "The most inspiring photography account I follow. Every post is a masterpiece.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "c0bcafe1-ad7c-4d40-a95d-30210d471360",
    rating: 4,
    comment: "Would love to see more behind-the-scenes of his editing process.",
  },

  // Olivia Martinez (2 reviews)
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "22f334ee-e5c1-4563-9e02-892dcbab5167",
    rating: 5,
    comment:
      "Olivia has an incredible eye for fashion. Her styling tips helped revamp my entire wardrobe.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "22f334ee-e5c1-4563-9e02-892dcbab5167",
    rating: 3,
    comment:
      "Great style, though many recommendations are quite expensive for the average person.",
  },

  // James Wilson (3 reviews)
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "c0793546-18a4-47c9-a447-4039b9ffcffc",
    rating: 5,
    comment:
      "James explains complex financial concepts in a way anyone can understand. My investments have improved thanks to him.",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "c0793546-18a4-47c9-a447-4039b9ffcffc",
    rating: 4,
    comment:
      "Solid advice, though sometimes the stock picks are a bit too conservative for my risk tolerance.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "c0793546-18a4-47c9-a447-4039b9ffcffc",
    rating: 5,
    comment:
      "The budgeting spreadsheet he shared was a game-changer for my personal finances.",
  },

  // Sophia Lee (2 reviews)
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "0138461d-8199-4fd9-b338-6d43e13c4abf",
    rating: 5,
    comment:
      "As someone new to veganism, Sophia's recipes made the transition so much easier. Delicious and simple!",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "0138461d-8199-4fd9-b338-6d43e13c4abf",
    rating: 4,
    comment:
      "Love the content, though some ingredients can be hard to find in smaller towns.",
  },

  // Daniel Brown (3 reviews)
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "d1f3c2df-7121-4c3d-a613-e9d87f883e2e",
    rating: 5,
    comment:
      "Daniel's adventure guides helped me discover places I never would have found on my own.",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "d1f3c2df-7121-4c3d-a613-e9d87f883e2e",
    rating: 5,
    comment:
      "The production quality of his travel videos is outstanding. Feels like I'm right there with him.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "d1f3c2df-7121-4c3d-a613-e9d87f883e2e",
    rating: 4,
    comment:
      "Would love to see more budget-friendly travel options in future content.",
  },

  // Ava Garcia (2 reviews)
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "25f900e7-3091-4c57-bf8d-0dddb86a34d5",
    rating: 5,
    comment:
      "Ava's makeup tutorials are the best! She explains techniques so clearly.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "25f900e7-3091-4c57-bf8d-0dddb86a34d5",
    rating: 4,
    comment:
      "Great skincare advice, though some recommended products are quite pricey.",
  },

  // Ethan Moore (3 reviews)
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "057d2599-cf59-46fb-aad5-1cd129388d4c",
    rating: 5,
    comment:
      "Ethan's productivity tips helped me organize my life and reduce stress significantly.",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "057d2599-cf59-46fb-aad5-1cd129388d4c",
    rating: 5,
    comment:
      "The minimalist living guide was exactly what I needed to declutter my home and mind.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "057d2599-cf59-46fb-aad5-1cd129388d4c",
    rating: 4,
    comment:
      "Would love to see more content about maintaining productivity in busy family environments.",
  },

  // Mia Thompson (2 reviews)
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "b9f5dfe8-9260-461e-9e37-b2f035a43f85",
    rating: 5,
    comment:
      "Mia's parenting advice is practical and non-judgmental. A breath of fresh air!",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "b9f5dfe8-9260-461e-9e37-b2f035a43f85",
    rating: 4,
    comment:
      "Great tips overall, though some activities require more time than working parents have.",
  },

  // Noah Anderson (3 reviews)
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "fb24fc91-c6a7-4300-acbc-6ef7769f5a09",
    rating: 5,
    comment:
      "Noah's DIY projects helped me save thousands in home repairs. Clear instructions!",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "fb24fc91-c6a7-4300-acbc-6ef7769f5a09",
    rating: 5,
    comment:
      "The woodworking tutorials are fantastic. I've built several pieces of furniture thanks to his guidance.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "fb24fc91-c6a7-4300-acbc-6ef7769f5a09",
    rating: 4,
    comment:
      "Would be helpful to include more beginner-friendly projects with minimal tools required.",
  },

  // Isabella Clark (2 reviews)
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "1d795213-8474-4b4a-bd20-224223eaca33",
    rating: 5,
    comment:
      "Isabella's zero waste tips are practical and actually achievable. Reduced my household waste by 60%!",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "1d795213-8474-4b4a-bd20-224223eaca33",
    rating: 4,
    comment:
      "Great content, though some solutions aren't accessible in all areas.",
  },

  // Liam White (3 reviews)
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "738ae5f0-e889-42d4-b32f-0b1ca4dfdc31",
    rating: 5,
    comment:
      "Liam's music production breakdowns are incredibly insightful. Learned so much about mixing.",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "738ae5f0-e889-42d4-b32f-0b1ca4dfdc31",
    rating: 5,
    comment:
      "The way he explains complex music theory concepts is genius. My tracks have improved dramatically.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "738ae5f0-e889-42d4-b32f-0b1ca4dfdc31",
    rating: 4,
    comment:
      "Would love to see more content about working with vocalists and lyricists.",
  },

  // Charlotte Hall (2 reviews)
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "7b36a323-f9e1-427c-a3b8-6b12ec0e14f3",
    rating: 5,
    comment:
      "Charlotte's book recommendations introduced me to so many amazing authors. My reading list has tripled!",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "7b36a323-f9e1-427c-a3b8-6b12ec0e14f3",
    rating: 4,
    comment:
      "Great reviews, though I'd love to see more genre variety beyond literary fiction.",
  },

  // Benjamin Young (3 reviews)
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "19d7b423-90cb-414d-9f61-bdc4789429e1",
    rating: 5,
    comment:
      "Benjamin's car reviews are the most comprehensive I've found. His attention to detail is unmatched.",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "19d7b423-90cb-414d-9f61-bdc4789429e1",
    rating: 5,
    comment:
      "The modification guides helped me upgrade my car safely and effectively. Saved me thousands in mechanic fees.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "19d7b423-90cb-414d-9f61-bdc4789429e1",
    rating: 4,
    comment:
      "Would be great to see more content about electric vehicles and their maintenance.",
  },

  // Amelia King (2 reviews)
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "82c5339e-c5d4-4097-9aaf-c951877d6054",
    rating: 5,
    comment:
      "Amelia's yoga routines helped me relieve chronic back pain. Grateful beyond words!",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "82c5339e-c5d4-4097-9aaf-c951877d6054",
    rating: 4,
    comment:
      "Excellent instruction, though some poses need more modifications for different body types.",
  },

  // Lucas Scott (3 reviews)
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "071627d8-1e65-4ff7-9ba9-430b8f044c64",
    rating: 5,
    comment:
      "Lucas's gaming streams are both entertaining and educational. Learned so many pro strategies!",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "071627d8-1e65-4ff7-9ba9-430b8f044c64",
    rating: 5,
    comment:
      "The esports commentary is top-notch. Provides insights I haven't heard anywhere else.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "071627d8-1e65-4ff7-9ba9-430b8f044c64",
    rating: 4,
    comment:
      "Would love to see more variety in the games covered, but excellent content overall.",
  },

  // Harper Adams (2 reviews)
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "02c7c4b8-e25d-4fe9-ad06-8eedef7d45fe",
    rating: 5,
    comment:
      "Harper's art curation introduced me to incredible emerging artists I now collect. Exceptional eye for talent!",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "02c7c4b8-e25d-4fe9-ad06-8eedef7d45fe",
    rating: 4,
    comment:
      "Would love to see more content about the business side of being an artist.",
  },

  // Henry Baker (3 reviews)
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "50cfcdd7-6e1e-44f5-8c36-3ca249952fe1",
    rating: 5,
    comment:
      "Henry's gourmet-on-a-budget recipes are restaurant quality without breaking the bank. My dinner parties have leveled up!",
  },
  {
    user_id: "2c23b6e6-f41a-4c72-8596-e5db067ad478",
    influencer_id: "50cfcdd7-6e1e-44f5-8c36-3ca249952fe1",
    rating: 5,
    comment:
      "The knife skills tutorial alone was worth following. My prep time has been cut in half.",
  },
  {
    user_id: "334d6ac3-3b6c-4071-a028-9eb0ba55fee7",
    influencer_id: "50cfcdd7-6e1e-44f5-8c36-3ca249952fe1",
    rating: 4,
    comment:
      "Would be helpful to include more substitutions for hard-to-find ingredients.",
  },
];

export const seedReviews = async () => {
  try {
    const count = await InfluencerReview.count();
    if (count > 0) {
      console.log("Reviews already exist in database");
      return;
    }

    await sequelize.transaction(async (transaction) => {
      await InfluencerReview.bulkCreate(reviewsData, {
        transaction,
        ignoreDuplicates: true,
      });
    });

    console.log("✅ Reviews seeded successfully");
  } catch (error) {
    console.error("❌ Failed to seed reviews:", error);
    throw error;
  }
};
